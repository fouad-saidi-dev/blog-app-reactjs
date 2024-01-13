import { Children } from "react";

const Each = ({render,of}) => {

return Children.toArray(of.map((item,index) => render(item, index)));

}

export default Each;