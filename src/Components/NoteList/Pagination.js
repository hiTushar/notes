import { Pagination } from 'react-bootstrap';

export default function PaginationComponent(props) {
    const { totalPage, currentPage, setCurrentPage } = props;
    
    function getItems() {
        let itemArray = [];
        for(let i = 0; i < totalPage; i++) {
            itemArray.push(<Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>{i + 1}</Pagination.Item>);
        }
        return itemArray;
    }

    return (
        <div className='mb-2'>
            <Pagination>
                {
                    getItems()
                }
            </Pagination>
        </div>
    )
}
