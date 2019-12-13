import React from 'react';
import {Container, Segment, Pagination, Button, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';


import ItemCard from './components/ItemCard';
import ErrorMessage from '../../UI/ErrorMessage/errorMessage';
import FlexContainer from '../../UI/flexContainer/FlexContainer';

import { ERROR_URL } from "../../route/URLMap";
import { ITEM_BASE_URL } from '../../route/URLMap';
import './styles/item.scss';
import { fetchItems } from '../../utils/api/item';

class Items extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoading: false,
            error: null,
            pagination: {},
            
        };
        
    }

    componentDidMount() {
        //this.loadItems();    
        this.setState({ isLoading: true}, () => {
            fetchItems()
                .then(itemData => {
                    console.log(itemData);
                    this.setState({
                        isLoading: false,
                        items: itemData
                    });
                })
                // .catch(error =>
                //     this.setState({error, isLoading: false}, error => {
                //         this.props.history.push({ pathname: ERROR_URL, state: {error}});
                //     }))
            })
        
    }

    // loadItems = (pageNum, pageSize) => {
    //     this.setState({ isLoading: true, items: []}, ()=> {
    //         fetchItems(pageNum, pageSize)
    //             .then(this.updateItemData)
    //             .catch(error => this.setState({error}));
    //     });
        
    // }



    // updateItemData = itemData => {
    //     console.log(itemData);
    //     this.setState({
            
    //         items: itemData.data,
    //         isLoading: false,
    //         pagination: itemData.pagination,
    //     })
        
    // }

    // handlePageChange = (event, data) => {
    //     this.loadItems(data.activePage);
    // }

    

    render() {
        const currentPath = this.props.location.pathname;

        return (
            <React.Fragment>
                <ErrorMessage error={this.state.error} />
                <Header as="h2">
                    Dishes
                </Header>
                <Container >
                    <Button as={Link} to={`${currentPath}/new`} >
                        Create a New Dish
                    </Button>
                    <Segment basic loading={this.state.isLoading} >
                        <FlexContainer justifyContentValue = "space-between">
                            {this.state.items.map(item => (
                                <ItemCard 
                                    productionName={item.productionName}
                                    price={item.price}
                                    productType={item.productType}
                                    productInfo={item.productInfo}
                                    category={item.category}
                                    key={item.id}
                                    to={`${ITEM_BASE_URL}/${item.id}`}
                                />
                            ))}
                        </FlexContainer>
                    </Segment>
                    {/* {
                        this.state.pagination.page && (
                            <FlexContainer >
                                <Pagination 
                                    activePage={this.state.pagination.page}
                                    disabled={this.state.isLoading}
                                    onPageChange={this.handlePageChange}
                                    totalPages={this.state.pagination.pages}
                                />
                            </FlexContainer>
                        )
                    } */}
                </Container>    
            </React.Fragment>
        );
    }
};

export default Items;