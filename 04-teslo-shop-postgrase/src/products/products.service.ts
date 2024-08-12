import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/common.error-handle.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FunctionsService } from 'src/common/common.functions.service';
import { Product, ProductImage } from './entities';
import { TypeError } from 'src/common/enums/common.error-handle.enum';

@Injectable()
export class ProductsService {
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository:Repository<ProductImage>,
    private readonly errorHandleService:ErrorHandleService,
    private readonly functionsService:FunctionsService,
    private readonly dataSourse:DataSource
  ) { }
  
  async create(createProductDto: CreateProductDto) {
    try {
      const {images = [], ...productDetails} = createProductDto;

      const product = this.productRepository.create({
        ...productDetails,
        images: images.map(image => this.productImageRepository.create({url:image}))
      });
      
      await this.productRepository.save(product);

      return {...product, images};
    } catch (error) {
      this.errorHandleService.errorHandleDB(error);
    }
  }

  async findAll(paginationDto:PaginationDto) {
    const {limit=10, offset=0} = paginationDto;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true
      }
    });

    return products.map(({images, ...rest}) => ({
      ...rest,
      images: images.map(img => img.url)
    }));
  }

  async findOne(term: string) {
    
    let product:Product;
    if (this.functionsService.isUUID(term)) {
      product = await this.productRepository.findOneBy({productId:term});
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .select('prod', 'prodImages.url')
        .where('slug = :slug OR UPPER(title) = :title', {
          slug:term.toLocaleLowerCase(),
          title:term.toUpperCase()
        }).leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();
    }

    if (!product) this.errorHandleService.errorHandle(`Product with search end "${term}" not found`, TypeError.NotFoundException); 

    return product;
  }

  async findOnePlain(term:string) {
    const {images = [], ...rest} = await this.findOne(term);
    
    return {
      ...rest,
      images: images.map(image => image.url)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const {images, ...toUpdate} = updateProductDto;
    const product = await this.productRepository.preload({productId:id, ...toUpdate});

    if (!product) this.errorHandleService.errorHandle(`Product with id "${id}" not found`, TypeError.NotFoundException); 

    const queryRunner = this.dataSourse.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {

      if (images) {
        await queryRunner.manager.delete(ProductImage, {product:{productId:id}})

        product.images = images.map(image => 
          this.productImageRepository.create({url:image})
        );
      } 

      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
    
      return await this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction()
      this.errorHandleService.errorHandleDB(error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id); 
    // !Otra forma de usarlos
    // const product = await this.findOnePlain(id); 
    await this.productRepository.remove(product);
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');
    try {
      return await query
        .delete()
        .where({})
        .execute();
    } catch (error) {
      this.errorHandleService.errorHandleDB(error);
    }
  }
}
