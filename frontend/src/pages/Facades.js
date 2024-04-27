// Facades.js

// userFacade class

export class UserFacade {
    constructor(username, password, email, age, bio) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.bio = bio;
    }
  
    static async createUser(userData) {
        try {
            const response = await fetch(`http://localhost:4000/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
  
            if (response.ok) {
                const user = await response.json();
                return user;
            } else {
                throw new Error('Error saving user data. Please try again later.');
            }
        } catch (error) {
            throw new Error('An error occurred. Please try again later.');
        }
    }
  
    static async fetchUserByUsername(username) {
        try {
            const response = await fetch(`http://localhost:4000/api/users/username/${username}`);
            const user = await response.json(); // Wait for response data
            return user;
        } catch (error) {
            throw new Error('An error occurred. Grabbing username.');
        }
    }

    static async fetchUserByUserid(user_id) {
        try {
            const response = await fetch(`http://localhost:4000/api/users/id/${user_id}`);
            const userData = await response.json();
            return userData;
        } catch (error) {
            throw new Error('An error occurred. Please try again later.');
        }
    }

    static async updateUser(user) {
        console.log(user)
        try {
            const response = await fetch(`http://localhost:4000/api/users/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
  
            if (response.ok) {
                const user = await response.json();
                return user;
            } else {
                throw new Error('Error saving user data. Please try again later.');
            }
        } catch (error) {
            throw new Error('An error occurred. Please try again later.');
        }
    }
  }
  

export class PostFacade {
    constructor(like_count, num_comments, date_created, user_id, content, title, blog_id) {
        this.like_count = like_count;
        this.num_comments = num_comments;
        this.date_created = date_created;
        this.user_id = user_id;
        this.content = content;
        this.title = title;
        this.blog_id = blog_id;
    }
  
    static async createPost(postData) {
        try {
            const response = await fetch(`http://localhost:4000/api/posts/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
  
            if (response.ok) {
                const post = await response.json();
                return post;
            } else {
                throw new Error('Error saving post data. Please try again later.');
            }
        } catch (error) {
            throw new Error('An error occurred. Please try again later.');
        }
    }
  
    static async updatePostLikeCount(postId, newLikeCount) {
        try {
            const response = await fetch(`http://localhost:4000/api/posts/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    like_count: newLikeCount
                })
            });
  
            if (!response.ok) {
                throw new Error('Failed to update like count');
            }
        } catch (error) {
            throw new Error('An error occurred while updating like count');
        }
    }

    static async fetchPostsByUserID(userID) {
        try {
            const posts_response = await fetch(`http://localhost:4000/api/posts/user_id/${userID}`);
            console.log('Fetch Friends Response: ', posts_response);
            const posts = await posts_response.json(); // Wait for response data
            return posts;
        } catch (error) {
            throw new Error('An error occurred while fetching posts.');
        }
    }

    static async fetchAllPosts(){
        try {
            const response = await fetch('http://localhost:4000/api/posts');
            const posts = await response.json();
            return posts;
        } catch (error) {
            throw new Error('An Error occured white fetching all post.');
        }
    }


    static async updatePostCommentCount(postId, newCommentCount) {
        try {
            const response = await fetch(`http://localhost:4000/api/comments/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num_comments: newCommentCount
                })
            });
  
            if (!response.ok) {
                throw new Error('Failed to update comment count');
            }
        } catch (error) {
            throw new Error('An error occurred while updating comment count');
        }
    }
  }

// blogFacade class
export class BlogFacade {
  constructor(user, title, contents, creation_date) {
      this.user = user;
      this.title = title;
      this.contents = contents;
      this.creation_date = creation_date;
  }

  static async createBlog(blogData) {
      console.log(blogData)
      try {
          const response = await fetch(`http://localhost:4000/api/blogs/`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(blogData)
          });

          if (response.ok) {
              const blog = await response.json();
              return blog;
          } else {
              throw new Error('Error saving blog data. Please try again later.');
          }
      } catch (error) {
          throw new Error('An error occurred. Please try again later.');
      }
  }
  static async fetchBlogByUserid(user_id){
      try {
          const blog_response = await fetch(`http://localhost:4000/api/blogs/userid/${user_id}`);
          const blog = await blog_response.json(); // Wait for response data
          console.log(blog)
          return blog;
      } catch (error) {
          throw new Error('An error occurred while fetching blog by user id.');
      }
}
}

export class FriendFacade {
    constructor(user_one, user_two){
        this.user_one = user_one;
        this.user_two = user_two;
    }

    static async fetchFriendsByUserid(user_one){
        try {
            const friends_response = await fetch(`http://localhost:4000/api/friends/user_id/${user_one}`);
            console.log('Fetch Friends Response: ', friends_response);
            const friends = await friends_response.json(); // Wait for response data
            return friends;
        } catch (error) {
            throw new Error('An error occurred while fetching friends.');
        }
    }

    static async addFriend(user_one, user_two) {
        try {
            const response = await fetch('http://localhost:4000/api/friends', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_one, user_two }),
            });
            if (!response.ok) {
                throw new Error('Failed to add friend');
            }
            return await response.json();
        } catch (error) {
            throw new Error('An error occurred while adding friend.');
        }
    }
}

export class CommentFacade {
    constructor(date_posted, post_id, content, user_id){
        this.date_posted = date_posted;
        this.post_id = post_id;
        this.content = content;
        this.user_id = user_id;
    }

    static async createComment(post_id, commentData) {
        try {
            const response = await fetch(`http://localhost:4000/api/comments/${post_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentData)
            });
    
            if (response.ok) {
                const comment = await response.json();
                return comment;
            } else {
                throw new Error('Error saving comment data. Please try again later.');
            }
        } catch (error) {
            throw new Error('An error occurred while creating comment');
        }
    }

    static async fetchComments(postId) {
        try {
          const response = await fetch(`http://localhost:4000/api/comments/${postId}`);
          const comments = await response.json();
          return comments;
        } catch (error) {
          throw new Error('An error occurred while fetching comments');
        }
      }
    
}

