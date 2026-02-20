import sqlite3
from datetime import datetime

class UserProfile:
    def __init__(self, username):
        self.username = username
        self.conn = sqlite3.connect('users.db')
        self.create_table()

    def create_table(self):
        """Create users table if it doesn't exist"""
        self.conn.execute('''CREATE TABLE IF NOT EXISTS users
             (username TEXT PRIMARY KEY,
              email TEXT,
              age INTEGER,
              gender TEXT,
              height REAL,
              weight REAL,
              fitness_goal TEXT,
              last_updated TEXT)''')
        self.conn.commit()

    def get_profile(self):
        """Get complete user profile"""
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username=?", (self.username,))
        return cursor.fetchone()

    def update_profile(self, **N):
        """Update user profile fields"""
        try:
            # Prepare update query
            fields = []
            values = []
            for key, value in kwargs.items():
                fields.append(f"{key}=?")
                values.append(value)
            
            values.append(self.username)
            update_query = f"UPDATE users SET {','.join(fields)}, last_updated=? WHERE username=?"
            values.append(datetime.now().isoformat())
            
            self.conn.execute(update_query, values)
            self.conn.commit()
            return True
        except Exception as e:
            print(f"Error updating profile: {e}")
            return False

    def complete_profile(self, email, age, gender, height, weight, fitness_goal):
        """Create or complete user profile"""
        try:
            self.conn.execute('''INSERT OR REPLACE INTO users 
                (username, email, age, gender, height, weight, fitness_goal, last_updated)
                VALUES (?,?,?,?,?,?,?,?)''',
                (self.username, email, age, gender, height, weight, fitness_goal, datetime.now().isoformat()))
            self.conn.commit()
            return True
        except Exception as e:
            print(f"Error completing profile: {e}")
            return False

    def close(self):
        """Close database connection"""
        self.conn.close()

# Example usage:
if __name__ == "__main__":
    # Initialize profile manager
    profile = UserProfile("test_user")
    
    # Complete profile example
    profile.complete_profile(
        email="test@example.com",
        age=30,
        gender="Male",
        height=175.5,
        weight=70.2,
        fitness_goal="Build muscle"
    )
    
    # Update profile example
    profile.update_profile(weight=68.5, fitness_goal="Maintain weight")
    
    # Get profile example
    print(profile.get_profile())
    
    profile.close()
