package top.builbu.business.user.entity;  
      

    public class User implements Comparable<Object>{  

		/**
	     *
	     *用户id
	    **/
        private java.lang.Long userId;  
	    /**
	     *
	     *邮箱
	    **/
        private java.lang.String email;  
	    /**
	     *
	     *昵称
            
	    **/
        private java.lang.String nickname;  
	    /**
	     *
	     *密码
	    **/
        private java.lang.String password;  
	    /**
	     *
	     *头像
	    **/
        private java.lang.String Icons;  
	    /**
	     *
	     *在线状态
	    **/
        private java.lang.Integer onLineStatus;  
	    /**
	     *
	     *
	    **/
        private java.lang.Long createById;  
	    /**
	     *
	     *
	    **/
        private java.sql.Timestamp createByDate;  
	    /**
	     *
	     *
	    **/
        private java.lang.Long updateById;  
	    /**
	     *
	     *
	    **/
        private java.sql.Timestamp updateByDate;  
	    /**
	     *
	     *
	    **/
        private java.lang.Integer userType;  
          

       public java.lang.Long getUserId(){  
            return this.userId;  
        }  
        public void setUserId(java.lang.Long userId){  
            this.userId=userId;  
        }  
          
        
          
        public java.lang.String getEmail(){  
            return this.email;  
        }  
       
        public void setEmail(java.lang.String email){  
            this.email=email;  
        }  
          
        
           
        public java.lang.String getNickname(){  
            return this.nickname;  
        }  
       
        public void setNickname(java.lang.String nickname){  
            this.nickname=nickname;  
        }  
          
        
          
        public java.lang.String getPassword(){  
            return this.password;  
        }  
       
        public void setPassword(java.lang.String password){  
            this.password=password;  
        }  
          
        
          
        public java.lang.String getIcons(){  
            return this.Icons;  
        }  
       
        public void setIcons(java.lang.String Icons){  
            this.Icons=Icons;  
        }  
          
        
           
        public java.lang.Integer getOnLineStatus(){  
            return this.onLineStatus;  
        }  
       
        public void setOnLineStatus(java.lang.Integer onLineStatus){  
            this.onLineStatus=onLineStatus;  
        }  
          
        
          
        public java.lang.Long getCreateById(){  
            return this.createById;  
        }  
       
        public void setCreateById(java.lang.Long createById){  
            this.createById=createById;  
        }  
          
        
          
        public java.sql.Timestamp getCreateByDate(){  
            return this.createByDate;  
        }  
       
        public void setCreateByDate(java.sql.Timestamp createByDate){  
            this.createByDate=createByDate;  
        }  
          
        
          
        public java.lang.Long getUpdateById(){  
            return this.updateById;  
        }  
       
        public void setUpdateById(java.lang.Long updateById){  
            this.updateById=updateById;  
        }  
          
        
          
        public java.sql.Timestamp getUpdateByDate(){  
            return this.updateByDate;  
        }  
       
        public void setUpdateByDate(java.sql.Timestamp updateByDate){  
            this.updateByDate=updateByDate;  
        }  
          
        
          
        public java.lang.Integer getUserType(){  
            return this.userType;  
        }  
       
        public void setUserType(java.lang.Integer userType){  
            this.userType=userType;  
        }
        
        /**
         * 队列优先排序定义规则
         * @param o
         * @return
         */
		@Override
		 public int compareTo(Object o){      // 实现 Comparable 接口的抽象方法，定义排序规则

            User u = (User)o;

            return (int) (u.getOnLineStatus()-this.getOnLineStatus());                      // 升序排列，反之降序

          }
          /**
           *重写 equals 方法
           * @param o
           * @return
           */
		@Override
	     public boolean equals(Object o){     //equals

	              boolean flag = false;

	              if(o instanceof User){

	                     if(this.getUserId() == ((User)o).getUserId())

	                            flag = true;

	              }

	              return flag;          

	       }    
          
    }  

