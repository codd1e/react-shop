import Item from "./Item";

function ItemsList(props) {
    const {items = [], addToBasket = Function.prototype} = props;

    if(!items.length){
        return(
            <h3>Not Found</h3>
        )
    }
    return(
        <div className="items">
            {
                items.map(item => (
                    <Item key = {item.id} {...item} addToBasket = {addToBasket}/>
                ))
            }
        </div>
    );
}

export default ItemsList;