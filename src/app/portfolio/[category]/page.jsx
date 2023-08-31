import Image from 'next/image'
import Button from '@/components/Button/Button'
import { items } from './data'
import { notFound } from 'next/navigation';

const getData = (cat) =>{
  const data = items[cat]

  if (data){
    return data
  }
  return notFound()
}


const Category = ({ params }) => {
  const data = getData(params.category)
  return (
    <div className="category">
      <h1 className="category__title">{params.category}</h1>
      {data.map((item) => (
        <div className="category__item" key={item.id}>
          <div className="category__content">
            <h1 className="category__subtitle">{item.title}</h1>
            <p className="category__desc">{item.desc}</p>
            <Button text="See More" url="#" />
          </div>
          <div className="category__image">
            <Image
              className="category__img"
              fill={true}
              src={item.image}
              alt={item.title}
            />
          </div>
        </div>))}
    </div>
  )
}

export default Category