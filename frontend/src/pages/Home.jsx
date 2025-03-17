import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  ChevronRight,
  ArrowRight,
  Star,
  BookOpen,
  Truck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full">
        {/* Background gradient circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-60 h-60 bg-purple-300/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 max-w-full">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
                <span className="text-blue-600">Shop</span> Online
                <br />
                Without Limits
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto md:mx-0 mb-8">
                Discover a new shopping experience that's convenient and secure
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                  >
                    <ShoppingBag size={20} />
                    Start Shopping
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-transparent border border-gray-600 text-gray-800 rounded-lg font-medium text-lg flex items-center justify-center gap-2 hover:bg-gray-100"
                  onClick={() =>
                    (window.location.href = 'mailto:srnishappy@gmail.com')
                  }
                >
                  <BookOpen size={20} />
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:w-1/2 relative"
            >
              <div className="relative bg-gradient-to-tr from-blue-400 to-purple-400 w-72 h-72 md:w-96 md:h-96 rounded-full mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/40 to-purple-400/40 blur-lg"></div>
                <div className="w-4/5 h-4/5 rounded-full bg-white/20 backdrop-blur-sm border border-gray-200 shadow-xl flex items-center justify-center">
                  <ShoppingBag size={80} className="text-gray-800" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white w-full">
        <div className="container mx-auto px-4 max-w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            >
              Our Services
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              We are committed to providing exceptional service for our
              customers
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <ShoppingBag size={28} className="text-blue-600" />,
                title: 'Quality Products',
                desc: 'Guaranteed quality for all items from leading stores',
              },
              {
                icon: <Truck size={28} className="text-blue-600" />,
                title: 'Fast Delivery',
                desc: 'Nationwide home delivery within 24 hours',
              },
              {
                icon: <Star size={28} className="text-blue-600" />,
                title: 'After-Sales Service',
                desc: 'Caring customer service with satisfaction guarantee',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: '0 15px 30px -10px rgba(59, 130, 246, 0.3)',
                }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-sm" // เปลี่ยนเป็นพื้นหลังโปร่งใส
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 w-full">
        <div className="container mx-auto px-4 max-w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 text-white relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute left-20 bottom-0 w-40 h-40 bg-white/20 rounded-full -mb-20 blur-2xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-white mb-6 max-w-lg">
                  Stay updated with promotions and new products every day. Get a
                  special 15% discount on your first order.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 flex-grow"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium flex items-center justify-center gap-2"
                    onClick={() =>
                      (window.location.href = 'mailto:srnishappy@gmail.com')
                    }
                  >
                    Subscribe
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>

              <div className="w-32 h-32 md:w-40 md:h-40 bg-white/20 rounded-full border border-white/30 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-blue-600">
                    15%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 w-full">
        <div className="container mx-auto px-4 max-w-full">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Popular Categories
            </h2>
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ x: -2 }}
              className="text-blue-600 flex items-center gap-1 font-medium"
            >
              View All <ChevronRight size={18} />
            </motion.button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Lorem ipsum dolor',
              'Lorem ipsum dolor',
              'Lorem ipsum dolor',
              'Lorem ipsum dolor',
            ].map((category, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  boxShadow: '0 15px 30px -10px rgba(59, 130, 246, 0.3)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer h-40 md:h-48 border border-gray-200"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm"></div>
                <span className="text-gray-800 font-medium text-lg">
                  {category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
