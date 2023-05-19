import './Cards.css';
import Card from '../Card/Card';

export default function Cards({ products, userId }) {
  // console.log(`update products`, products);
  // console.log(`updateProducts`, prodcts?.cartCode);
  return (
    <div className='cards_container'>
      {products &&
        products.map((prod) => {
          return <Card key={prod.id} product={prod} userId={userId} />;
        })}
    </div>
  );
}
