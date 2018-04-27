console.log('loaded view.js');

window.onload=function(){
    var pre = document.createElement('pre')
    pre.style.backgroundColor='black'
    pre.style.color="lime"
    pre.style.fontFamily="Monaco"
    document.body.appendChild(pre)
    document.body.style.backgroundColor="black"
    var f = location.search.slice(1) // file to show
    fetch(f).then(x=>{
        console.log('x',x)
        x.text().then(txt=>{
            pre.textContent=txt
        })
    })
}