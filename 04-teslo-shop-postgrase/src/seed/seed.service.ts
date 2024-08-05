import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class SeedService {

  constructor(private productsService:ProductsService) { }
  
  async runSeed() {
    await this.insertNewProducts();
    
    return 'seed executed.';
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();

    return true;
  }

}
