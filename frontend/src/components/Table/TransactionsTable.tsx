import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import NavLink from '../NavLink/NavLink';
import Button from '@/components/Button/Button';
import DialogDemo from '../Dialog/Dialog';

interface Data {
    id: string;
    voltage: string;
    sampledTimestamp: string;
    wh: string;
    watt: string;
    ampere: string;
    temperature: string;
    reqTimestamp: string;
    msgId: string;
}


const TransactionsTable = ({ data }: any) => {
    const rows: Data[] = data.map((curr: any, index: string) => {
        const reqDate = new Date(curr.req_timestamp);
        const sampledDate = new Date(curr.sampledTimestamp);
        // Format the date into a readable string
        const formattedSampledDate = `${sampledDate.toLocaleDateString()} ${sampledDate.toLocaleTimeString()}`;
        const formattedReqDate = `${reqDate.toLocaleDateString()} ${reqDate.toLocaleTimeString()}`;
        return {
            id: index,
            voltage: curr.Voltage,
            reqTimestamp: formattedReqDate,
            sampledTimestamp: formattedSampledDate,
            wh: curr.Wh,
            watt: curr.Watt,
            ampere: curr.Ampere,
            temperature: curr.Temperature,
            msgId: curr.payload_msg_unique_id,
        };
    });

    function convertDurationToSeconds(durationString: string): number {
        const parts = durationString.split(' ');
        let totalSeconds = 0;
        for (let i = 0; i < parts.length; i += 2) {
            const value = parseInt(parts[i]);
            const unit = parts[i + 1];
            if (unit.includes('hour')) {
                totalSeconds += value * 3600;
            } else if (unit.includes('minute')) {
                totalSeconds += value * 60;
            }
        }
        return totalSeconds;
    }

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (orderBy === 'sessionDuration') {
            // Convert session duration strings back to seconds for comparison
            const durationA = convertDurationToSeconds(a[orderBy] as string);
            const durationB = convertDurationToSeconds(b[orderBy] as string);
            if (durationB < durationA) {
                return -1;
            }
            if (durationB > durationA) {
                return 1;
            }
            return 0;
        } else {
            // Normal comparison for other columns
            if (b[orderBy] < a[orderBy]) {
                return -1;
            }
            if (b[orderBy] > a[orderBy]) {
                return 1;
            }
            return 0;
        }
    }

    type Order = 'asc' | 'desc';

    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (a: { [key in Key]: number | string | boolean }, b: { [key in Key]: number | string | boolean }) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    interface HeadCell {
        disablePadding: boolean;
        id: keyof Data;
        label: string;
        numeric: boolean;
    }

    const headCells: HeadCell[] = [
        {
            id: 'id',
            numeric: false,
            disablePadding: false,
            label: 'Index',
        },
        {
            id: 'reqTimestamp',
            numeric: true,
            disablePadding: false,
            label: 'Time of Request',
        },
        {
            id: 'sampledTimestamp',
            numeric: true,
            disablePadding: false,
            label: 'Time of sample',
        },
        {
            id: 'temperature',
            numeric: true,
            disablePadding: false,
            label: 'Temperature',
        },
        {
            id: 'watt',
            numeric: true,
            disablePadding: false,
            label: 'Watt',
        },
        {
            id: 'wh',
            numeric: true,
            disablePadding: false,
            label: 'Kilowatt hour',
        },
        {
            id: 'voltage',
            numeric: true,
            disablePadding: false,
            label: 'Voltage',
        },
        {
            id: 'ampere',
            numeric: true,
            disablePadding: false,
            label: 'Ampere',
        },
        {
            id: 'msgId',
            numeric: true,
            disablePadding: false,
            label: 'Messages',
        },
    ];

    interface EnhancedTableProps {
        numSelected: number;
        onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
        onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
        order: Order;
        orderBy: string;
        rowCount: number;
    }

    function EnhancedTableHead(props: EnhancedTableProps) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
        const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    interface EnhancedTableToolbarProps {
        numSelected: number;
    }

    function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
        const { numSelected } = props;

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                        Transactions
                    </Typography>
                )}
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        );
    }

    function EnhancedTable() {
        const [order, setOrder] = React.useState<Order>('asc');
        const [orderBy, setOrderBy] = React.useState<keyof Data>('msgId');
        const [selected, setSelected] = React.useState<readonly string[]>([]);
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);

        const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        };

        const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                const newSelected = rows.map((n) => n.id);
                setSelected(newSelected);
                return;
            }
            setSelected([]);
        };

        const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
            const selectedIndex = selected.indexOf(id);
            let newSelected: readonly string[] = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }
            setSelected(newSelected);
        };

        const handleChangePage = (event: unknown, newPage: number) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        const isSelected = (id: string) => selected.indexOf(id) !== -1;

        const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

        const visibleRows = React.useMemo(
            () =>
                stableSort(rows, getComparator(order, orderBy)).slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                ),
            [order, orderBy, page, rowsPerPage],
        );

        return (
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align='justify' component="th" id={labelId} scope="row" padding="none">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align='right' component="th" id={labelId} scope="row" padding="none">
                                                {row.reqTimestamp}
                                            </TableCell>
                                            <TableCell align="right">{row.sampledTimestamp}</TableCell>
                                            <TableCell align="right">{`${row.temperature} (Celsius)`}</TableCell>
                                            <TableCell align="right">{`${row.watt} (Watt)`}</TableCell>
                                            <TableCell align="right">{`${row.wh} (Wh)`}</TableCell>
                                            <TableCell align="right">{`${row.voltage} (V)`}</TableCell>
                                            <TableCell align="right">{`${row.ampere} (A)`}</TableCell>
                                            <TableCell align="right">
                                                <DialogDemo
                                                    callDialogButton={<Button>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                                                    </Button>}
                                                    msgId={row.msgId}
                                                />
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        );
    }
    return (
        <EnhancedTable />
    )
}

export default TransactionsTable;
