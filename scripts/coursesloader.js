const temp=window.location.href;
const lang=temp.substring(temp.indexOf("/courses"));
load();
async function load(){
    const result = await fetch(lang, {
        method: 'POST',
    }).then((res) => res.json())
    console.log(result.data);
    data=result.data;
    var inhtml='';
        for(let i=0;i<data.length;i++){
         inhtml=inhtml.concat('<div class="col-xl-4 col-lg-4 col-md-6"> \
            <div class="single-course mb-70"> \
                <div class="course-img">\
                    <img src="assets/img/gallery/popular_sub2.png" alt="">\
                </div>\
                <div class="course-caption">\
                    <div class="course-cap-top">\
                        <h4><a href="'+ lang + '/player/'+i+'">'+data[i].title+'</a></h4>\
                    </div>\
                    <div class="course-cap-bottom d-flex justify-content-between">\
                        <ul>\
                            <li><i class="ti-user"></i> 562</li>\
                            <li><i class="ti-heart"></i> 562</li>\
                        </ul>\
                        <span>Free</span>\
                    </div>\
                </div>\
            </div>\
            </div>');}   
        console.log(inhtml)
    document.getElementById("nav-tabContent").innerHTML=inhtml;
}


