import Item from "./Item";
import {useContext} from "react";
import {ShopContext} from "../context";

function ItemsList() {
    const {items = []} = useContext(ShopContext);

    if(!items.length){
        return(
            <h3>Not Found</h3>
        )
    }
    return(
        <div className="items">
            {
                items.map(item => (
                    <Item key = {item.id} {...item} />
                ))
            }
        </div>
    );
}

export default ItemsList;