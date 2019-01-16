function loadScript (url) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    document.body.appendChild(script)
  })
}

function loadStyle (url) {
  return new Promise((resolve) => {
    const script = document.createElement('link')
    script.ref = "stylesheet"
    script.type = "text/css"
    script.href = url
    script.onload = resolve
    document.body.appendChild(script)
  })
}

async function loadAllScripts (urls) {
  for (let url of urls) {
    await loadScript(url)
  }
}

async function loadAllStyles (urls) {
  for (let url of urls) {
    await loadStyle(url)
  }
}

$(function(){
  const args = {}
  document.location.search.substring(1).split('&').forEach((s) => {
    let [name, value] = s.split('=')
    args[name] = decodeURIComponent(value)
  })
  const codelist = args['code']
  const csslist = args['css']

  console.log('codelist', codelist)

  if (codelist) {
    let urls = codelist.split(/,/)
    loadAllScripts(urls)
  }
  if (csslist) {
    let urls = csslist.split(/,/)
    loadAllStyles(urls)
  }
})
