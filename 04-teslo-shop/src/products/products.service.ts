import { CommonFunctionsService } from './../common/common.functions.service';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, MssqlParameter, Repository, BeforeInsert } from 'typeorm';
import { Product } from './entities/product.entity';
import { SizeDto } from 'src/sizes/dto/size.dto';
import { ErrorHandleService } from 'src/common/common.error-handler.service';
import { BussinesRulesService } from './validations/bussines-rules.service';
import { ProductDto } from './dto/product.dto';
import { Gender } from 'src/gender/entities/gender.entity';
import { Size } from 'src/sizes/entities/size.entity';
import { ProductFilter } from './filter/product.filter';
// import { CommonService } from 'src/common/common.service';

@Injectable()
export class ProductsService {

// #region Constantes
private xlmRoot = `<sizes>{0}</sizes>`;
private xmlNode = '<size sizeid="{0}"></size>';
// #endregion

  // !poner los sps en donde corresponden 
  private spProductInsert:string = 'spProductInsert @0, @1, @2, @3, @4, @5, @6, @7';
  private spProductGet:string = 'spProductGet @0, @1';
  private spProductSizeGet:string = 'spProductSizeGet';
  private spSizeGet:string = 'spSizeGet';
  private spProductDelete:string = 'spProductDelete @0';

  constructor(
    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>,
    @InjectDataSource('default')
    private readonly dataSource:DataSource,
    private readonly commonFunctionsService:CommonFunctionsService,
    private readonly errorHandler:ErrorHandleService,
    private readonly bussinesRuleService:BussinesRulesService
  ) { }

  async create(createProductDto: CreateProductDto) {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productId = await this.commonFunctionsService.getUuid();
      await this.bussinesRuleService.productValidation(createProductDto);
      
      await queryRunner.manager.query(this.spProductInsert,
         [ productId,
          createProductDto.title,
          createProductDto.price,
          createProductDto.description,
          createProductDto.slug,
          createProductDto.stock,
          createProductDto.gender.genderId,
          await this.generateXMLProductoSize(createProductDto.sizes)]
      );
      
      await queryRunner.commitTransaction();
      const productDtoBefore = JSON.stringify(createProductDto);
      const product:Product = {productId, ...JSON.parse(productDtoBefore)};
      return product;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.errorHandler.errorDB(error);
    } finally {
      await queryRunner.release();
    }
  }

  private generateXMLProductoSize(size:SizeDto[]):string {
    let xmlNodeResult = ``;
    size.forEach(size => {
      xmlNodeResult+= this.commonFunctionsService.formatString(this.xmlNode,size.sizeId);
    });
    let xmlRootResul = this.commonFunctionsService.formatString(this.xlmRoot,xmlNodeResult)
    return xmlRootResul;
  }

  async findAll() {
    // !Poner los tipados correspondientes
    const products:ProductDto[] = [];
    const resultProduct = await this.dataSource.manager.query(this.spProductGet, [this.commonFunctionsService.getUuid(),'']);
    const resultProductSize = await this.dataSource.manager.query(this.spProductSizeGet);
    const resultSize:SizeDto[] = await this.dataSource.manager.query<Promise<SizeDto[]>>(this.spSizeGet);

    resultProduct.forEach(r => {
      const gender:Gender = {genderId:r.genderId, clave:r.clave, name:r.name};
      const sizes:SizeDto[] = [];

      resultProductSize.filter(rps => {
        if(rps.productId == r.productId) {
          sizes.push(resultSize.find(rs => rs.sizeId == rps.sizeId));
        }
      });

      const product:ProductDto = {...r, gender, sizes};
      products.push(product);
    });

    return products;
  }

  async findOne(term: ProductFilter) {
    // !Poner los tipados correspondientes
    const products:ProductDto[] = [];
    const resultProduct = await this.dataSource.manager.query(this.spProductGet, [
      term.productId ? term.productId : this.commonFunctionsService.getUuid(),
      term.slug ? term.slug : '']);
    const resultProductSize = await this.dataSource.manager.query(this.spProductSizeGet);
    const resultSize:SizeDto[] = await this.dataSource.manager.query<Promise<SizeDto[]>>(this.spSizeGet);

    resultProduct.forEach(r => {
      const gender:Gender = {genderId:r.genderId, clave:r.clave, name:r.name};
      const sizes:SizeDto[] = [];

      resultProductSize.filter(rps => {
        if(rps.productId == r.productId) {
          sizes.push(resultSize.find(rs => rs.sizeId == rps.sizeId));
        }
      });

      const product:ProductDto = {...r, gender, sizes};
      products.push(product);
    });

    return products;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const product:ProductDto[] = await this.findOne({productId:id});

      if(product.length == 0) throw new NotFoundException(`The product with id: ${id} not exists`);

      await queryRunner.manager.query(this.spProductDelete,[id]);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.errorHandler.errorDB(error);
    } finally {
      await queryRunner.release();
    }
  }
}
