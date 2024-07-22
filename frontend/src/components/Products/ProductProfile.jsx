// import '../../css/ProductProfile.css';

import '../../css/ProductProfile.css';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ProductProfile = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
  
    const product = {
      category: "LED Bulb",
      details: {
        name: "LED 5W Bulb",
        brand: "Divya",
        price: 200,
        size: ["Medium"],
        watt: "5W",
        description: "lastai babal, khatrai xa, dami xa, harib xa yar, kinnai parni hunxa, quality ko k kura, nakinneko aadhi jeeban dhosta, yo chalayena ta k chalayo, kini halam",
        instock: 0,
        imageurl: "/images/1719145211062.png"
      }
    };
  
    const handleCommentSubmit = (e) => {
      e.preventDefault();
      if (newComment.trim()) {
        const comment = {
          username: 'User123',
          profilePicture: 'https://via.placeholder.com/40',
          text: newComment
        };
        setComments([...comments, comment]);
        setNewComment('');
      }
    };
  console.log(rating);
    return (
      <div className="product-container">
        <div className="product-main">
          <div className="product-image-rating">
            <div className="product-imagee">
              <img
                src={`http://localhost:5000/public${product.details.imageurl}`}
                alt={product.details.name}
                className="prod_prof_img"
              />
            </div>
            <div className="rating-section">
              <p><strong>Rate this product:</strong></p>
              <div className="stars">
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <FaStar
                      key={i}
                      className="star"
                      color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                      size={20}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => setRating(ratingValue)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="product-detailss">
            <h1>{product.details.name}</h1>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Brand:</strong> {product.details.brand}</p>
            <p><strong>Wattage:</strong> {product.details.watt}</p>
            <p><strong>Size:</strong> {product.details.size.join(', ')}</p>
            <p><strong>Price:</strong> Rs {product.details.price}</p>
            <p className='description'><strong>Description:</strong> {product.details.description}</p>
            <p><strong>Stock:</strong> {product.details.instock > 0 ? `${product.details.instock} available` : 'Out of stock'}</p>
          </div>
        </div>
        <div className="product-comments">
          <h2>Comments</h2>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
            />
            <button type="submit">Submit</button>
          </form>
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="comment">
                <img src={comment.profilePicture} alt={`${comment.username}'s profile`} className="profile-picture" />
                <div className="comment-details">
                  <p className="username">{comment.username}</p>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default ProductProfile;

