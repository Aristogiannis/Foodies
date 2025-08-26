-- Sample data for the Foodies application

-- Insert sample menu items - only if they don't exist
INSERT INTO menu_items (name, description, price, image_url, category, is_available, created_at, updated_at) 
SELECT 'Margherita Pizza', 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil', 12.99, '/uploads/pizza.jpg', 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Margherita Pizza');

INSERT INTO menu_items (name, description, price, image_url, category, is_available, created_at, updated_at) 
SELECT 'Classic Burger', 'Juicy beef patty with lettuce, tomato, cheese, and special sauce', 9.99, '/uploads/burger.jpg', 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Classic Burger');

INSERT INTO menu_items (name, description, price, image_url, category, is_available, created_at, updated_at) 
SELECT 'Creamy Alfredo Pasta', 'Fettuccine pasta in rich cream sauce with parmesan cheese', 11.99, '/uploads/pasta.jpg', 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Creamy Alfredo Pasta');

INSERT INTO menu_items (name, description, price, image_url, category, is_available, created_at, updated_at) 
SELECT 'Caesar Salad', 'Fresh romaine lettuce with parmesan cheese, croutons, and caesar dressing', 8.99, '/uploads/salad.jpg', 'Appetizer', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Caesar Salad');

INSERT INTO menu_items (name, description, price, image_url, category, is_available, created_at, updated_at) 
SELECT 'Chocolate Cake', 'Rich chocolate layer cake with chocolate ganache frosting', 6.99, '/uploads/cake.jpg', 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Chocolate Cake');

INSERT INTO menu_items (name, description, price, image_url, category, is_available, created_at, updated_at) 
SELECT 'Iced Latte', 'Smooth espresso with cold milk and ice', 4.99, '/uploads/latte.jpg', 'Beverage', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Iced Latte');

-- Insert ingredients for menu items using menu item names instead of hardcoded IDs
INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Fresh mozzarella' FROM menu_items m WHERE m.name = 'Margherita Pizza' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Fresh mozzarella');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Tomato sauce' FROM menu_items m WHERE m.name = 'Margherita Pizza' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Tomato sauce');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Basil' FROM menu_items m WHERE m.name = 'Margherita Pizza' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Basil');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Pizza dough' FROM menu_items m WHERE m.name = 'Margherita Pizza' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Pizza dough');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Beef patty' FROM menu_items m WHERE m.name = 'Classic Burger' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Beef patty');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Lettuce' FROM menu_items m WHERE m.name = 'Classic Burger' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Lettuce');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Tomato' FROM menu_items m WHERE m.name = 'Classic Burger' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Tomato');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Cheese' FROM menu_items m WHERE m.name = 'Classic Burger' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Cheese');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Bun' FROM menu_items m WHERE m.name = 'Classic Burger' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Bun');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Special sauce' FROM menu_items m WHERE m.name = 'Classic Burger' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Special sauce');

-- Add more ingredients for other items...
INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Fettuccine pasta' FROM menu_items m WHERE m.name = 'Creamy Alfredo Pasta' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Fettuccine pasta');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Heavy cream' FROM menu_items m WHERE m.name = 'Creamy Alfredo Pasta' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Heavy cream');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Parmesan cheese' FROM menu_items m WHERE m.name = 'Creamy Alfredo Pasta' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Parmesan cheese');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Espresso' FROM menu_items m WHERE m.name = 'Iced Latte' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Espresso');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Cold milk' FROM menu_items m WHERE m.name = 'Iced Latte' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Cold milk');

INSERT INTO menu_item_ingredients (menu_item_id, ingredient) 
SELECT m.id, 'Ice' FROM menu_items m WHERE m.name = 'Iced Latte' AND NOT EXISTS (SELECT 1 FROM menu_item_ingredients i WHERE i.menu_item_id = m.id AND i.ingredient = 'Ice');

-- Insert a sample admin user (password: admin123) - only if it doesn't exist
INSERT INTO users (username, email, password, role, created_at) 
SELECT 'admin', 'admin@foodies.com', '$2a$10$KIhZevXtmLQlHMcfJcMuJ.J5RQjCpVq5h5wF8J7HhHl.Zq9j1b4tC', 'BUSINESS_OWNER', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@foodies.com');

-- Insert a sample regular user (password: user123) - only if it doesn't exist
INSERT INTO users (username, email, password, role, created_at) 
SELECT 'testuser', 'user@foodies.com', '$2a$10$1c/9g3UJfJQkIzO6KXvJ5.QJzJ9bN9qWE.1Q2pI8XsZ3bN4v5cD6e', 'USER', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'user@foodies.com');
