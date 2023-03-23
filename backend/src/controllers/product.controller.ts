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
    res.status(500).send({ message: 'An error occurred' });
  }
};

export const getProductsCount = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ length: await Product.countDocuments() });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred' });
  }
};

export const getProductsFromLower = async (req: Request, res: Response) => {
  try {
    const { lower, count } = req.params;
    res.status(200).send(await Product.find({}).skip(Number(lower)).limit(Number(count)));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred' });
  }
};

export const getProductsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.status(200).send(await Product.findById(id));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred' });
  }
};

export const updateProduct = async (req: ProductRequest, res: Response) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body.product);
    if (!updatedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send({ message: 'Product updated' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);

    res.status(200).send({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred' });
  }
};

export const addProduct = async (req: ProductRequest, res: Response) => {
  try {
    const product = new Product({
      ...req.body.product,
    });

    const alreadyExists = await Product.findByBrandAndName(req.body.product.brand, req.body.product.name);
    if (alreadyExists) {
      return res.status(404).send({ message: 'Product already exists!' });
    }

    await product.save();
    res.status(201).send({ message: 'Product created' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred' });
  }
};
