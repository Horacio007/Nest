import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, MssqlParameter, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CommonService } from 'src/common/common.service';
import { SizeDto } from 'src/sizes/dto/size.dto';
// import { CommonService } from 'src/common/common.service';

@Injectable()
export class ProductsService {

// #region Constantes
private xlmRoot = `<sizes>{0}</sizes>`;
private xmlNode = '<size sizeid="{0}"></size>';
// #endregion

  private spProductInsert:string = 'spProductInsert @0, @1, @2, @3, @4, @5, @6, @7';
  private othersp:string = `
     DECLARE	@return_value int, @salida varchar(50)
        EXEC	@return_value = [dbo].[_sp_getallproducto]
		@productoLimit = {0},
		@salida = @salida OUTPUT

SELECT	@salida as N'@salida'
  `

  constructor(
    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>,
    @InjectDataSource('default')
    private readonly dataSource:DataSource,
    private readonly commonService:CommonService
  ) { }

  async create(createProductDto: CreateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productId = this.commonService.getUuid();
      await this.dataSource.manager.query(this.spProductInsert,
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
      const productDtoBefore = JSON.stringify(createProductDto)
      const product:Product = {productId, ...JSON.parse(productDtoBefore)} 
      return product
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw new InternalServerErrorException('Ayuda!!!');
    } finally {
      await queryRunner.release();
    }
  }

  private generateXMLProductoSize(size:SizeDto[]):string {
    let xmlNodeResult = ``;
    size.forEach(size => {
      xmlNodeResult+= this.commonService.formatString(this.xmlNode,size.sizeId);
    });
    let xmlRootResul = this.commonService.formatString(this.xlmRoot,xmlNodeResult)
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
