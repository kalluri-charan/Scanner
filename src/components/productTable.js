import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TotalDialog from "./totalDialog";


export const ProductTable = ({productsInfo}) => {
    const totalCost = React.useMemo(() => {
        return productsInfo.reduce((amount, item) => item.cost + amount, 0);
    }, [productsInfo]);
    return (
        <>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productsInfo.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>$ {product.cost}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TotalDialog totalProductsValue={totalCost}/>
        </>
    )
};