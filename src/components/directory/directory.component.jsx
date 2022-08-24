import DirectoryItem from '../directory-item/directory-tem.component';
import './directory.styles.scss';

const categories = [
    {
      "id": 1,
      "title": "Hats",
      "imageUrl": "https://preview.redd.it/ro5higesdku51.jpg?auto=webp&s=ed7fc411736cb66acec284983e96d5973a6618fd",
      route: 'shop/hats'
    },
    {
      "id": 2,
      "title": "Jackets",
      "imageUrl": "https://process.fs.grailed.com/reDn8Oy8RQSbtWibChru",
      route: 'shop/jackets'
    },
    {
      "id": 3,
      "title": "Sneakers",
      "imageUrl": "https://media.gq.com/photos/60d21a25ab6b8cc6e9d2c80a/3:4/w_2700,h_3600,c_limit/SNEAKER_GUIDE_OPENER.jpg",
      route: 'shop/sneakers'
    },
    {
      "id": 4,
      "title": "Womens",
      "imageUrl": "https://images.unsplash.com/photo-1627483297929-37f416fec7cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHw%3D&w=1000&q=80",
      route: 'shop/womens'
    },
    {
      "id": 5,
      "title": "Mens",
      "imageUrl": "https://img.joomcdn.net/97fd4feb72e1ca8f5c668091bd4ec53852ff4063_original.jpeg",
      route: 'shop/mens'
    }
  ]


const Directory = () =>{
    return (
        <div className = "directory-container">
          {categories.map((category)=>(
              <DirectoryItem key = {category.id} category = {category}/>
          ))}
      </div>
    );
}

export default Directory;




