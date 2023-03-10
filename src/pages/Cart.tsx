import { useNavigate } from 'react-router-dom';
import { getUserNewToken } from '../api/userService';
import CartItemCard from '../components/CartItemCard';
import EmptyPage from '../components/EmptyPage';
import { queryGetCartItems } from '../store/ReactQuery';

export type cartContentType = {
  imageUri: string;
  isQuantityChanged: boolean;
  name: string;
  onSale: boolean;
  price: number;
  productId: number;
  quantity: number;
};

export default function Cart() {
  const navigate = useNavigate();
  const { isLoading, data } = queryGetCartItems();

  const getCartItemsFunc = () => {
    if (isLoading) return;

    if (data) {
      const totalPrice = data.reduce((acc: number, cur: cartContentType) => {
        return acc + cur.quantity * cur.price;
      }, 0);

      const orderClick = () => {
        navigate('/order', {
          state: {
            orderItems: data,
            totalPrice: totalPrice,
          },
        });
      };

      return (
        <>
          <div className='mt-7'>
            {data.length !== 0 ? (
              data.map((items: cartContentType) => (
                <CartItemCard
                  key={items.productId}
                  id={items.productId}
                  img={items.imageUri}
                  title={items.name}
                  count={items.quantity}
                  price={items.price}
                />
              ))
            ) : (
              <EmptyPage text={'장바구니가 비었습니다.'} />
            )}
          </div>
          <div className='flex justify-end mt-6'>
            <div className='grid grid-cols-2 text-lg'>
              <span className='flex justify-end mr-3 text-xl'>
                총 결제금액 :
              </span>
              <span className='flex justify-end'>
                {totalPrice.toLocaleString()}원
              </span>
            </div>
          </div>
          <div className='flex justify-center mt-10'>
            <button
              className='w-24 p-2 btn btn-primary'
              type='button'
              onClick={orderClick}
            >
              주문하기
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div className='flex flex-col justify-center mx-auto max-w-cartDiv'>
      <h1 className='flex justify-center text-4xl'>장바구니</h1>

      <div>{getCartItemsFunc()}</div>
    </div>
  );
}
