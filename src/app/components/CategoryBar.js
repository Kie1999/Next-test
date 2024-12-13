const CategoryBar = () => {
    const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports'];
    
    return (
      <div className="category-bar">
        {categories.map(category => (
          <button key={category}>{category}</button>
        ))}
      </div>
    );
  };
  
  export default CategoryBar;
  