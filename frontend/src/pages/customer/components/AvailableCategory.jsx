import React, { useState, useRef, useEffect } from "react";
import fruitsVegetables from "../../../assets/categories/vegitables.png";
import breakfast from "../../../assets/categories/breakfast&snacks.png";
import groceries from "../../../assets/categories/groceries.png";
import frozenFood from "../../../assets/categories/frozenFood.png";
import iceCreams from "../../../assets/categories/iceCreams.png";
import packagedFood from "../../../assets/categories/packagedFood.png";
import sweets from "../../../assets/categories/sweets.png";
import teaCofee from "../../../assets/categories/teaCofee.png";


export default function AvailableCategory() {
  const [activeCategory, setActiveCategory] = useState("Fruits & Vegetables");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const containerRef = useRef(null);

  const categories = [
    { name: "Fruits & Vegetables", img: fruitsVegetables },
    { name: "Dairy,Bread & Eggs", img: breakfast },
    { name: "Atta,Rice,Oil & Dals", img: groceries },
    { name: "Frozen Food", img: frozenFood },
    { name: "Ice Creams & More", img: iceCreams },
    { name: "Packaged Food", img: packagedFood },
    { name: "Sweet Cravings", img: sweets },
    { name: "Tea, Cofee & More", img: teaCofee },
  ];

  const handleCategoryClick = (category, index) => {
    setActiveCategory(category.name);
    const categoryElements = containerRef.current.querySelectorAll(".home-category");
    const target = categoryElements[index];
    if (target) {
      const rect = target.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // move underline under clicked category
      setUnderlineStyle({
        width: `${rect.width}px`,
        left: `${rect.left - containerRect.left}px`,
      });
    }

    // fetch products from backend here
    // fetchProducts(category.name);
  };

  // set initial underline position on first render
  useEffect(() => {
    const categoryElements = containerRef.current.querySelectorAll(".home-category");
    const activeIndex = categories.findIndex((c) => c.name === activeCategory);
    if (categoryElements[activeIndex]) {
      const rect = categoryElements[activeIndex].getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setUnderlineStyle({
        width: `${rect.width}px`,
        left: `${rect.left - containerRect.left}px`,
      });
    }
  }, []);

  return (
    <div className="home-available-categories" ref={containerRef}>
      {categories.map((category, index) => (
        <div
          key={index}
          className={`home-category ${
            activeCategory === category.name ? "active" : ""
          }`}
          onClick={() => handleCategoryClick(category, index)}
        >
          <img src={category.img} alt={category.name} />
          <h3>{category.name}</h3>
        </div>
      ))}

      {/* Animated underline */}
      <div className="underline" style={underlineStyle}></div>
    </div>
  );
}
