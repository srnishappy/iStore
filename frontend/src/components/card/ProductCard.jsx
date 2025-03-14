import { ShoppingCart, Check } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ProductCard = ({ item }) => {
  const hasImages =
    item.images && Array.isArray(item.images) && item.images.length > 0;
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    actionAddtoCart(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  // Card stagger effect on entrance
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        mass: 0.8,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  // Children elements animation
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  // Button animation
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 5px 15px rgba(74, 144, 226, 0.4)',
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 15,
      },
    },
    tap: {
      scale: 0.95,
    },
    added: {
      backgroundColor: '#22C55E',
      transition: { duration: 0.3 },
    },
  };

  // Image hover animation
  const imageVariants = {
    hover: {
      scale: 1.12,
      filter: 'brightness(1.1)',
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-b from-[#1E1E1E] to-[#252525] shadow-2xl rounded-2xl overflow-hidden w-full transform transition-all duration-300 relative group border border-gray-800"
    >
      {/* Discount Badge (if applicable) */}
      {item.discount && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
        >
          {item.discount}% OFF
        </motion.div>
      )}

      {/* Image Section with Hover Effect */}
      <motion.div className="relative overflow-hidden h-48">
        {hasImages ? (
          <motion.div className="w-full h-full" whileHover="hover">
            <motion.img
              variants={imageVariants}
              src={item.images[0].url}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ) : (
          <div className="w-full h-full bg-[#2C2C2C] flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}

        {/* Elegant gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#1E1E1E] to-transparent pointer-events-none" />
      </motion.div>

      {/* Product Details */}
      <motion.div variants={childVariants} className="p-4 space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <motion.h3
              variants={childVariants}
              className="text-lg font-semibold text-white truncate max-w-[70%]"
              title={item.title}
            >
              {item.title}
            </motion.h3>
            <motion.span
              variants={childVariants}
              className="text-xs bg-gradient-to-r from-[#4A90E2] to-[#5A6EE1] text-white px-2 py-1 rounded-full shadow-sm"
            >
              New
            </motion.span>
          </div>
          <motion.p
            variants={childVariants}
            className="text-sm text-gray-400 line-clamp-2"
          >
            {item.description}
          </motion.p>
        </div>

        {/* Price and Add to Cart */}
        <motion.div
          variants={childVariants}
          className="flex justify-between items-center mt-2"
        >
          <motion.div
            variants={childVariants}
            className="text-md font-bold text-[#4A90E2]"
          >
            {item.price.toLocaleString()} ฿
          </motion.div>

          <motion.button
            onClick={handleAddToCart}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={isAdded ? 'added' : 'initial'}
            className="bg-gradient-to-r from-[#4A90E2] to-[#5A6EE1] text-white rounded-md px-4 py-2 
            flex items-center gap-2 
            transition-all duration-300 
            shadow-md"
            aria-label={`Add ${item.title} to cart`}
          >
            {isAdded ? (
              <>
                <Check size={16} className="animate-fadeIn" />
                <span className="text-sm">Added</span>
              </>
            ) : (
              <>
                <ShoppingCart
                  size={16}
                  className="group-hover:rotate-12 transition-transform"
                />
                <span className="text-sm">Add to Cart</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Ghost reflection effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-0 left-0 right-0 h-1/5 bg-gradient-to-b from-white to-transparent pointer-events-none"
      />
    </motion.div>
  );
};

export default ProductCard;
