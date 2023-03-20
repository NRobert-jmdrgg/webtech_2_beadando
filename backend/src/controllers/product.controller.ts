import { Request, Response } from 'express';
import Product, { IProduct } from '../models/product';

interface ProductRequest extends Request {
  product?: IProduct;
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await Product.find({}));
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

export const getProductsCount = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ length: await Product.countDocuments() });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

export const getProductsFromLower = async (req: Request, res: Response) => {
  try {
    const { lower, count } = req.params;
    res.status(200).send(await Product.find({}).skip(Number(lower)).limit(Number(count)));
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

export const getProductsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.status(200).send(await Product.findById(id));
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

export const updateProduct = async (req: ProductRequest, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body.product);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    await product.save();
    res.status(200).send('Product updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    res.status(200).send('Product deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

export const addProduct = async (req: ProductRequest, res: Response) => {
  try {
    const { name, brand, price, registeredBy, category } = req.body.product;
    const product = new Product({
      name,
      brand,
      price,
      registeredBy,
      category,
    });

    const alreadyExists = await Product.findByBrandAndName(brand, name);
    if (alreadyExists) {
      return res.status(404).send('Product already exists!');
    }

    await product.save();
    res.status(201).send('Product created');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};
