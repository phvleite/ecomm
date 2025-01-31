/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import ProductService from '../services/productsService.js';
import CategoryService from '../services/categoriesService.js';
import validates from '../services/utils.js';
import NotFoundError from '../errors/NotFoundError.js';

class ProductController {
  static getAllProducts = async (_req, res) => {
    const listProducts = await ProductService.getAllProducts();
    res.status(200).json(listProducts);
  };

  static getProductById = async (req, res) => {
    const { id } = req.params;
    const isValideID = validates.paramsID(id);

    if (isValideID) {
      const product = await ProductService.getProductById(id);
      if (!product) {
        res.status(404).send({ message: 'Produto não localizado!' });
      } else {
        res.status(200).json(product);
      }
    } else {
      res.status(400).send({ message: 'ID inválido!' });
    }
  };

  static getProductByName = async (req, res) => {
    const { products } = req.query;
    const searchName = new RegExp(`${products}.*`, 'igm');
    const result = await ProductService.getProductByName(searchName);
    res.status(200).json(result);
  };

  static getProductsByValue = async (req, res) => {
    const { min, max } = validates.valuesMaxMin(req.query);
    if (Number(min) > Number(max)) {
      const message = 'Valor mínimo maior que valor máximo. Operação não permitida!';
      throw new NotFoundError(message);
    }
    const result = await ProductService.getProductsByValue(max, min);
    res.status(200).json(result);
  };

  static getProductsByStock = async (req, res) => {
    const { stock } = validates.valueStock(req.query);
    const result = await ProductService.getProductsByStock(stock);
    res.status(200).json(result);
  };

  static getProductsByCategoryId = async (req, res) => {
    const { id } = req.params;
    const isValideID = validates.paramsID(id);

    if (isValideID) {
      const isExistCategory = await CategoryService.checkIsExistsCategoryById(id);
      if (isExistCategory) {
        const products = await ProductService.getProductsByCategoryId(id);
        res.status(200).json(products);
      }
      res.status(404).send({ message: 'Categoria não localizada!' });
    } else {
      res.status(400).send({ message: 'ID inválido!' });
    }
  };

  static createProduct = async (req, res) => {
    const keys = Object.keys(req.body);
    if (keys.length === 0) {
      const message = 'Objeto vazio, sem propriedades!';
      throw new NotFoundError(message);
    }
    const { nome, categoria } = validates.paramsProduct(req.body);

    const isExist = await ProductService.checkIsExistsProduct(nome);
    if (isExist) return res.status(400).send({ message: 'Produto já cadastrado!' });

    const isValideIdCategory = validates.paramsID(categoria);
    if (!isValideIdCategory) return res.status(400).send({ message: 'ID categoria inválido!' });

    const isExistCategory = await CategoryService.checkIsExistsCategoryById(categoria);
    if (!isExistCategory) return res.status(400).send({ message: 'Categoria não localizada!' });

    const isActiveCategory = await CategoryService.checkIsCategoryActive(categoria);
    if (!isActiveCategory) return res.status(400).send({ message: 'Categoria Inativa!' });

    const newProduct = await ProductService.createProduct(req.body);
    res.status(201).send(newProduct.toJSON());
  };

  static updateProduct = async (req, res) => {
    const { id } = req.params;

    const isValideID = validates.paramsID(id);
    if (!isValideID) {
      const message = 'ID inválido!';
      throw new NotFoundError(message);
    }

    const keys = Object.keys(req.body);
    if (keys.length === 0) {
      const message = 'Objeto vazio, sem propriedades!';
      throw new NotFoundError(message);
    }

    const dataProduct = validates.paramsUpdateProduct(req.body);
    const { nome, categoria } = dataProduct;

    if (nome) {
      const isValideIdCategory = validates.paramsID(categoria);
      if (!isValideIdCategory) return res.status(400).send({ message: 'ID categoria inválido!' });

      const isExistCategory = await CategoryService.checkIsExistsCategoryById(categoria);
      if (!isExistCategory) return res.status(400).send({ message: 'Categoria não localizada!' });

      const isActiveCategory = await CategoryService.checkIsCategoryActive(categoria);
      if (!isActiveCategory) return res.status(400).send({ message: 'Categoria Inativa!' });
    }

    const updateProduct = await ProductService.updateProduct(id, dataProduct);
    if (!updateProduct) {
      res.status(404).send({ message: 'Produto não localizado!' });
    } else {
      res.status(204).send(updateProduct.toJSON());
    }
  };

  static deleteProductById = async (req, res) => {
    const { id } = req.params;
    const isValideID = validates.paramsID(id);

    if (isValideID) {
      const deleteProduct = await ProductService.deleteProductById(id);
      if (!deleteProduct) {
        res.status(404).send({ message: 'Categoria não localizada!' });
      } else {
        res.status(204).send();
      }
    } else {
      res.status(400).send({ message: 'ID inválido!' });
    }
  };
}

export default ProductController;
