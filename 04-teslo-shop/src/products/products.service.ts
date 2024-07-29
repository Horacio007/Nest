import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, MssqlParameter, Repository, BeforeInsert } from 'typeorm';
import { Product } from './entities/product.entity';
import { CommonFunctionsService } from 'src/common/common.functions.service';
import { SizeDto } from 'src/sizes/dto/size.dto';
import { ErrorHandleService } from 'src/common/common.error-handler.service';
import { BussinesRulesService } from './validations/bussines-rules.service';
// import { CommonService } from 'src/common/common.service';

@Injectable()
export class ProductsService {

// #region Constantes
private xlmRoot = `<sizes>{0}</sizes>`;
private xmlNode = '<size sizeid="{0}"></size>';
// #endregion

  private spProductInsert:string = 'spProductInsert @0, @1, @2, @3, @4, @5, @6, @7';

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

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
