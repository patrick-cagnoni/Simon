import React, {useState} from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';

const TransactionRow = props => {

    const { transaction, onUpdateTransaction, onDeleteClick, categoriesOpt, typeOpt } = props;
    const [isEdit, setEdit] = useState(false);
    const [date, setDate] = useState(transaction.date);
    const [type, setType] = useState(transaction.type);
    const [category, setCategory] = useState(transaction.category);
    const [notes, setNotes] = useState(transaction.notes);
    const [amount, setAmount] = useState(parseFloat(transaction.amount).toFixed(2));

    function handleSave(){

        const updatedTransaction = {
            id: transaction.id,
            date,
            type,
            category,
            notes,
            amount
        }
        onUpdateTransaction(updatedTransaction);
        setEdit(false);
    }
    
    if(isEdit){
        return ( 
            <tr className="transaction-row">
                <td><input type="date" value={date} onChange={e => setDate(e.target.value)}/></td>
                <td>
                    <select 
                        onChange={e => {setType(e.target.value)}} 
                        value={type} 
                        className="select-type">
                        {typeOpt.map(t => (
                            <option key={t}value={t} >{t}</option>
                        ))}
                    </select>
                </td>
                <td>
                    <select onChange={e => setCategory(e.target.value)} value={category} className="select-category">
                        {categoriesOpt[type.toLowerCase()].sort().map(cat =>(
                            <option key={cat}value={cat}>{cat}</option>
                        ))}
                    </select>
                    </td>
                <td><textarea rows="1" onChange={e => setNotes(e.target.value)} value={notes} className="textarea-notes"></textarea></td>
                <td><input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="input-amount text-right"/></td>
                <td className="transactions-cell-options" >
                    <button 
                        className="btn btn-success mr-2" 
                        onClick={handleSave }>
                            <Icon icon={faSave}/>
                    </button>
                    <button 
                        className="btn btn-danger" 
                        onClick={() => setEdit(false)}>
                            <Icon icon={faWindowClose}/>
                    </button>
                </td>
            </tr>
        );
    }
    else{
        return ( 
            <tr className="transaction-row">
                <td className="col-date">{date}</td>
                <td className="col-type">{transaction.type}</td>
                <td className="col-category">{transaction.category}</td>
                <td className="col-notes">{transaction.notes}</td>
                <td className={`text-${transaction.type === 'Expense'? 'danger': 'success'} col-amount`}>$ {parseFloat(transaction.amount).toFixed(2)}</td>
                <td className="transactions-cell-options col-options">
                    <button 
                        onClick={() => setEdit(true)}
                        className="btn btn-info mr-2" >
                            <Icon icon={faEdit} className="icon icon-edit"/>
                    </button>
                    <button 
                        onClick={() => onDeleteClick(transaction.id)}
                        className="btn btn-danger">
                            <Icon icon={faTrash} className="icon icon-trash"/>
                    </button>
                </td>
            </tr>
        );
    }
}
 
export default TransactionRow;