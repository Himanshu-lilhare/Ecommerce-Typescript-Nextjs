export function handleScroll() {
  let ele = document.getElementsByClassName("layout-main")[0];
  let classname: string = "overflowY-hidden";
  if (ele.classList.contains(classname)) {
    ele.classList.remove(classname);
  } else {
    ele.classList.add(classname);
  }
}
