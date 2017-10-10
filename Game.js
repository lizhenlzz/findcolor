window.findColor=window.findColor||{};
(function(){
	function Game(){	
		this.timer=null;
		this.score=0;		
		this.toolView();
		this.init();
		//this.start();
	};
	//初始化游戏的数据
	Game.prototype.init=function(){
		this.row=2;
		this.currentTime=30;
		
		this.timeView.textContent="还剩"+this.currentTime+"秒"
		this.scoreView.textContent=this.score+"分";
		console.log(this.score)
		this.loadView();
	}
	Game.prototype.toolView=function(){
		var toolContainer=document.createElement("div");
		var startButton=document.createElement("button");
		var stopButton=document.createElement("button");
		
		toolContainer.appendChild(startButton);
		toolContainer.appendChild(stopButton);
		document.querySelector(".find-color").appendChild(toolContainer);
		startButton.textContent="开始";
		stopButton.textContent="结束"
		var self=this;
		startButton.onclick=function(){
			self.start();
		};
		stopButton.onclick=function(){
			self.stop();
		};
		var timeView=document.createElement("span")
		var scoreView=document.createElement("span")
		toolContainer.appendChild(timeView);
		toolContainer.appendChild(scoreView);
		this.timeView=timeView;
		this.scoreView=scoreView;
	}
	//加载视图界面的方法
	Game.prototype.loadView=function(){
		if (this.gameContent) {
			this.gameContent.parentNode.removeChild(this.gameContent)
		};
		//色块的背景颜色
		var color="rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
		//createDocumentFragment创建文档的碎片元素 在使用循环添加子元素到父元素的时候，可以使用它每次给真实父元素添加子元素的开销；
		//一个虚拟不存在的容器
		var temp=document.createDocumentFragment();
		var num=this.row*this.row;
		var id=parseInt(Math.random()*num);
		var self=this;
		for (var i=0;i<num;i++) {
			var item=null;
			if (i==id) {
				//特殊色块
				item=new findColor.ColorView({background:color,opacity:0.6,row:this.row,containerWidth:400}).view;
			    item.onclick=function(){
			    	//成功
			    	if (!self.timer) {return}
			    	++self.row;
			    	++self.score;
			    	self.updataView()
			    	self.loadView();	
			    }
			
			}else{
				//普通色块
				item=new findColor.ColorView({background:color,opacity:1,row:this.row,containerWidth:400}).view;
			    item.onclick=function(){
			    	if (!self.timer) {return}
			    	//失败
			    	self.updataView();
			    	self.stop();
			    	self.loadView();
			    }
			
			};
			temp.appendChild(item);
		};
		this.gameContent=document.createElement("div")
		this.gameContent.style.cssText = "width:400px;height:400px;background:aliceblue";
        this.gameContent.disabled = true;
		this.gameContent.appendChild(temp)
		document.querySelector(".find-color").appendChild(this.gameContent)
	};
	//游戏开始
	Game.prototype.start=function(){
		if (this.timer) {return}
		this.timer=setInterval(function(){
			--this.currentTime;	
			this.updataView();
			if (this.currentTime<=0) {
				//游戏结束
				this.stop()
			}
		}.bind(this),1000);
	};
	//游戏停止
	Game.prototype.stop=function(){
		clearInterval(this.timer)
		this.timer=null;
		this.init();
		this.endView();
		
	};
	//更新
	Game.prototype.updataView=function(){
		this.timeView.textContent="还剩"+this.currentTime+"秒"
		this.scoreView.textContent=this.score+"分";
		console.log(this.score)
	};
	//结束页面
	Game.prototype.endView=function(){
		var mark=document.createElement("p");
		var assess=document.createElement("p");
		var ensure=document.createElement("button");
		var pic=document.createElement("div");
		document.querySelector(".end-view").innerHTML="";
        ensure.textContent="确定";
		mark.textContent="你的得分："+this.score;
		if (this.score<10) {
			assess.textContent="你的视力重度低下"
		}else if (10<=this.score&&this.score<15) {
			assess.textContent="你的视力轻度低下"
			
		}else if(15<=this.score&&this.score<20){
			assess.textContent="你的视力正常"
			//pic.style.cssText="background: url(http://img.zcool.cn/community/0180d857df426b0000012e7e670acb.gif);background-size: 150px 150px;"
		}else{
			assess.textContent="你的视力非常人可比"
		}
		document.querySelector(".end-view").appendChild(mark);
		document.querySelector(".end-view").appendChild(assess);
		document.querySelector(".end-view").appendChild(pic);
		document.querySelector(".end-view").appendChild(ensure);
		document.querySelector(".end-view").style.cssText="display: block;";
		ensure.onclick=function(){
			document.querySelector(".end-view").style.cssText="display: none;";
//			this.scoreView.textContent=this.score+"分";
            this.loadView()
            this.scoreView.textContent=0+"分";
            this.score=0;
		}.bind(this)
		
	}
	//玩家PK
	Game.prototype.PK=function(user){
		
	};
	//背景音乐
	Game.prototype.backgroundMusicInit=function(){
		
	};
	
	findColor.Game=Game;
})()
