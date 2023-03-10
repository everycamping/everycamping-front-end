import { ProductType } from '../components/Product/ProductList';
import axios from 'axios';
import { ProductDetailType } from '../components/Product/ProductInfo';
import { NewProductType } from '../components/Product/ProductForm';
import { authAxios } from './authAxios';

export const PROXY = '/api';

export async function getProducts(
  category?: string,
  filter?: string,
  keyword?: string,
  seller?: boolean,
  tag?: string
): Promise<ProductType[]> {
  if (seller) {
    return getSellerItems();
  }
  return keyword || tag
    ? search(category, keyword, tag)
    : getItems(category, filter);
}

export async function getProductDetail(id: string): Promise<ProductDetailType> {
  const res = await axios.get(`${PROXY}/products/${id}`);
  return res.data;
}

export async function getSellerProductDetail(
  productId: string
): Promise<NewProductType> {
  const res = await authAxios.get(`${PROXY}/manage/products/${productId}`);
  return res.data;
}

export async function addNewProduct(
  product: NewProductType,
  image: File,
  detailImage: File
) {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(product)], {
    type: 'application/json',
  });
  formData.append('form', blob);
  formData.append('image', image);
  formData.append('detailImage', detailImage);

  return authAxios.post(`${PROXY}/manage/products`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function updateProduct(
  productId: string,
  product: NewProductType,
  image?: File,
  detailImage?: File
) {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(product)], {
    type: 'application/json',
  });
  formData.append('form', blob);
  image && formData.append('image', image);
  detailImage && formData.append('detailImage', detailImage);

  return authAxios.put(`${PROXY}/manage/products/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function deleteProduct(productId: string) {
  return authAxios.delete(`${PROXY}/manage/products/${productId}`);
}

async function search(
  category?: string,
  keyword?: string,
  tag?: string
): Promise<ProductType[]> {
  if (tag) {
    const res = await axios.get(`${PROXY}/products?tags=${tag}`);
    return res.data.content;
  }
  const res = await axios.get(
    `${PROXY}/products?${
      category === 'ALL'
        ? `name=${keyword}`
        : `category=${category}&name=${keyword}`
    }`
  );
  return res.data.content;
}

async function getItems(
  category?: string,
  filter?: string
): Promise<ProductType[]> {
  const res = await axios.get(
    `${PROXY}/products${
      category ? `?category=${category}` : `?size=4&sort=${filter},DESC`
    }`
  );
  return res.data.content;
}

async function getSellerItems() {
  const res = await authAxios.get(`${PROXY}/manage/products`);
  return res.data.content;
}

export async function getInfiniteItems(
  category?: string,
  filter?: string,
  page?: number
): Promise<ProductType[]> {
  const res = await axios.get(
    `${PROXY}/products?category=${category}&page=${page}&size=8&sort=${filter},DESC`
  );
  return res.data.content;
}
