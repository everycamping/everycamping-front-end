import { ChangeEvent, FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { addNewProduct } from '../../api/productsService';

export type NewProductType = {
  category: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  onSale: boolean;
};

export default function ProductForm() {
  const navigate = useNavigate();
  const [image, setImage] = useState<File>();
  const [detailImage, setDetailImage] = useState<File>();
  const [product, setProduct] = useState({
    category: 'category',
    name: '',
    price: 0,
    stock: 0,
    image: '',
    description: '',
    onSale: true,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const { files } = e.target as HTMLInputElement;
    if (name === 'image') {
      setImage((files as FileList)[0]);
      return;
    }
    if (name === 'detailImage') {
      setDetailImage((files as FileList)[0]);
      return;
    }
    setProduct((product) => {
      if (name === 'onSale') {
        return { ...product, onSale: !product.onSale };
      }
      return { ...product, [name]: value };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    image &&
      detailImage &&
      addNewProduct(product, image, detailImage).then(() => navigate(-1));
  };

  return (
    <form className='flex flex-col gap-3 items-center' onSubmit={handleSubmit}>
      <select
        className='select w-full max-w-xs bg-white'
        name='category'
        onChange={handleChange}
        value={product.category ?? ''}
      >
        <option disabled value='category'>
          카테고리
        </option>
        <option value='TENT'>Tent</option>
        <option value='COOK'>Cook</option>
        <option value='ACCESSORY'>Accessory</option>
      </select>
      <input
        type='text'
        name='name'
        value={product.name ?? ''}
        placeholder='제품명'
        className='input w-full max-w-xs bg-white'
        required
        onChange={handleChange}
      />
      <label className='input-group w-full max-w-xs'>
        <span className='w-20 justify-center'>가격</span>
        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          min='0'
          className='input bg-white w-full'
          required
          onChange={handleChange}
        />
      </label>
      <label className='input-group w-full max-w-xs'>
        <span className='w-20 justify-center'>수량</span>
        <input
          type='number'
          name='stock'
          value={product.stock ?? ''}
          min='0'
          className='input bg-white w-full'
          required
          onChange={handleChange}
        />
      </label>
      <span>대표이미지</span>
      <input
        type='file'
        name='image'
        className='file-input w-full max-w-xs bg-white'
        accept='image/*'
        required
        onChange={handleChange}
      />
      <textarea
        name='description'
        value={product.description ?? ''}
        className='textarea w-full max-w-xs bg-white text-base'
        placeholder='제품설명'
        required
        onChange={handleChange}
      ></textarea>
      <span>상세이미지</span>
      <input
        type='file'
        name='detailImage'
        className='file-input w-full max-w-xs bg-white'
        accept='image/*'
        required
        onChange={handleChange}
      />
      <label className='label cursor-pointer'>
        <span className='label-text mr-2'>판매</span>
        <input
          type='checkbox'
          className='checkbox checkbox-primary'
          name='onSale'
          onChange={handleChange}
          checked={product.onSale}
        />
      </label>
      <button type='submit' className='btn btn-wide btn-primary mt-3'>
        등록하기
      </button>
    </form>
  );
}