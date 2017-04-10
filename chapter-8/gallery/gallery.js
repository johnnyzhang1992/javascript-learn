// 跟踪记录当前所看的图片
var curImage = null;

// 重定位图库到页面的中心，就算页面经过了滚动
function adjust(){
		// 定位到图库
		var obj = id("gallery");
		
		// 确保图库是存在的
		if ( !obj ) return;
		
		// 获取它当前的高度和宽度
		var w = getWidth( obj );
		var h = getHeight( obj );
		
		// 定位这个盒子，相对于窗口垂直居中
		var t = scrollY() + ( windowHeight() / 2 ) - ( h / 2 );
		
		// 但不能超过页面的顶端
		if ( t < 0 ) t = 0;
		
		// 定位这个盒子，相对于窗口水平居中
		var l = scrollX() + ( windowWidth() / 2 ) - ( w / 2 );
		
		// 但不能超过页面的左端
		if ( l < 0 ) l = 0;
		
		// 设置元素经过调整后的位置
		setY( obj, t );
		setX( obj, l );
}

// 用户滚动页面或者重置浏览器大小，每次都重新调整图库的位置
window.onresize = document.onscroll = adjust;

// 在一个具体的图库上开始所有图片的幻灯
function startShow(obj) {
		// 定位到图库的每一张图片
		var elem = tag( "li", obj );
		
		// 定位到显示的整个图库
		var gallery = id("gallery");
		
		// 遍历每一个匹配的图库图片
		for ( var i = 0; i < elem.length; i++ )  new function() {
				// 记录当前被引用的图片
				var cur = elem[i];
				
				// 我们没五秒显示一张新的图片
				setTimeout(function(){
						// 显示指定的图片
						showImage( cur );
						
						// 并在3.5秒后渐隐
						// (因为只有1秒的渐隐时间
						setTimeout(function(){
								fadeOut( gallery, 0, 10 );
						}, 3500 );
				}, i * 5000 );
						
		};
		
		// 然后在结束时隐藏全部
		setTimeout( hideOverlay, 5000 * elem.length );
		
		// 但是还是显示覆盖层，因为幻灯刚开始
		showOverlay();
}

// 隐藏当前图库的灰色覆盖层
function hideOverlay() {
		// 确保重置当前图片
		curImage = null;
		
		// 并隐藏覆盖层和图库
		hide( id("overlay") );
		hide( id("gallery") );
}

// 显示灰色覆盖层
function showOverlay() {
		// 获取覆盖层
		var over = id("overlay");
		
		// 让它与整个页面保持一致的高度和宽度
		// (避免页面滚动后产生的问题)
		over.style.height = pageHeight() + "px";
		over.style.width = pageWidth() + "px";
		
		// 并渐隐
		fadeIn( over, 50, 10 );
}

// 获取上一个图片并显示它
function prevImage() {
		// 定位到上一个图片并显示它
		showImage( prev( curImage ) );
		
		// 防止链接跳转
		return false;
}

// 获取下一个图片并显示它
function nextImage() {
		// 定位到下一个图片并显示它
		showImage( next( curImage ) );
		
		// 防止链接跳转
		return false;
}

// 显示图库的当前信息
function showImage(cur) {
		// 记住当前处理的图片
		curImage = cur;//cur = '<li><a><img src="...></a></li>'
		
		// 获取图库图片
		var img = id("gallery_image");
		
		// 删除当前图片，如果存在的话
		if ( img.firstChild )
				img.removeChild( img.firstChild );
				
		// 并用我们的新图片取而代之
		img.appendChild( cur.firstChild.cloneNode( true ) );

		// 我们设置图库的说明为该图片的‘alt’里的内容
		id("gallery_title").innerHTML = cur.firstChild.firstChild.alt;
		
		// 如果是在图库的最后一张，隐藏下一张
		if ( !next(cur) ){
			hide( id("gallery_next") );
		}// 否则，显示
		else{
			show( id("gallery_next") );
		}

		// 隐藏“上一张”,如果现在是在图库的第一张
		if ( !prev(cur) ){
			hide( id("gallery_prev") );
		}// 否则，显示
		else{
			show( id("gallery_prev") );
		}

		// 定位到主图库中
		var gallery = id("gallery");
		
		// 设置正确的class (这样才能显示恰当的尺寸)
		gallery.className = cur.className;
		
		// 然后平滑地渐隐
		fadeIn( gallery, 100, 10 );
		
		// 确保图片在屏幕中的位置正确
		adjust();
}

// 在DOM中增加用来初始化幻灯片的导航

function addSlideShow(elem) {
	// 我们会在换的的周围创建一下额外的上下文信息

	// 创建幻灯的头部和包裹器
	var div = document.createElement("div");
	div.className = "slideshow";

	// 幻灯片的名字，这里使用的图库的title
	var span = document.createElement("span");
	span.innerHTML = elem.title;
	div.appendChild( span );

	// 创建一个链接，由此我们可以把图库所有的图片当做幻灯的一幕
	var a = document.createElement("a");
	a.href = "";
	a.innerHTML = "&raquo; View as a Slideshow";

	// 点击后开始幻灯
	a.onclick = function(){
		startShow( this.parentNode.nextSibling );
		return false;
	};

	// 为页面chauffeur新的导航和头部
	div.appendChild( a );
	elem.parentNode.insertBefore( div, elem );
}



// 在修改或遍历DOM之前等待文档的完成加载
window.onload = function() {
		/*
		 * 建立如下的DOM结构
		 * <div id="overlay"></div>
		 * <div id="gallery">
		 *     <div id="gallery_image"></div>
		 *     <div id="gallery_prev"><a href="">&laquo; Prev</a></div>
		 *     <div id="gallery_next"><a href="">Next &raquo;</a></div>
		 *     <div id="gallery_title"></div>
		 * </div>
		 */
		 
		// 创建半透明、灰色的覆盖层
		var overlay = document.createElement("div");
		overlay.id = "overlay";

		// 当点击覆盖层，把它和图库都隐藏
		overlay.onclick = hideOverlay;
		
		// 把这个覆盖层插入到DOM中
		document.body.appendChild( overlay );
		
		// 创建整个图库的支架
		var gallery = document.createElement("div");
		gallery.id = "gallery";
		
		// 并加入所有的用以组织的divs
		gallery.innerHTML = '<div id="gallery_image"></div>' +
				'<div id="gallery_prev"><a href="">&laquo; Prev</a></div>' +
				'<div id="gallery_next"><a href="">Next &raquo;</a></div>' +
				'<div id="gallery_title"></div>';
		
		// 把图库插入DOM中
		document.body.appendChild( gallery );
		
		// 支持图库内上一张和下一张点击跳转的处理器
		id("gallery_next").onclick = nextImage;
		id("gallery_prev").onclick = prevImage;
		
		// 定位到页面的所以图库
		var g = byClass( "gallery", "ul" );
		
		// 遍历所有的图库
		for ( var i = 0; i < g.length; i++ ) {
				// 并定位到幻灯图片的所有链接
				var link = tag( "a", g[i] );
				
				// 定义所有图片链接
				for ( var j = 0; j < link.length; j++ ) {
						// 确保做到：当点击的时候，显示图库而不是跳转图片
						link[j].onclick = function(){
								// 显示灰色背景的覆盖图
								showOverlay();
								
								// 在图库内显示图片
								showImage( this.parentNode );
								// 确保浏览器不会像普通情况下跳转图片
								return false;
						};
				}
				// 在图库内加入幻灯片导航
			    addSlideShow(g[i]);
		}
};