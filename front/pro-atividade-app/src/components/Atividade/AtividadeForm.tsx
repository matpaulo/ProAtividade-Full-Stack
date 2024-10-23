import { faFloppyDisk, faFolderPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

interface Props {
    atividades: any[]; 
    addAtividade: any;
    ativSelecionada: any;
    atualizarAtividade: any;
    cancelarAtividade: any;
}

const atividadeInicial = {
    id: '0',
    titulo: '',
    descricao: '',
    prioridade: '0',
}

export default function AtividadeForm({ 
        cancelarAtividade, atualizarAtividade, addAtividade, ativSelecionada 
    }: Props) {
    const [atividade, setAtividade] = useState(atividadeInicial);
  
    useEffect(() => {
        setAtividade(
            ativSelecionada.id !== '0' ? ativSelecionada : atividadeInicial
        );
    }, [ativSelecionada]);

    const inputTextHandler = (e: any) => {
        const { name, value } = e.target;
        setAtividade({ ...atividade, [name]: value });
    };

    const handleCancelar = (e: any) => {
        e.preventDefault();
        cancelarAtividade();
        setAtividade(atividadeInicial);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (ativSelecionada.id !== '0') {
            atualizarAtividade(atividade);
        } else {
            addAtividade(atividade);
            setAtividade(atividadeInicial);
        }
    }

    return (
    <>
        <form className='row g-3' onSubmit={handleSubmit}>
            <div className='col-md-6'>
                <label className='form-label'>Título:</label>
                <input
                    name='titulo' 
                    id='titulo' 
                    value={atividade.titulo || ''}
                    className='form-control'
                    onChange={inputTextHandler}  
                />
            </div>
            <div className='col-md-6'>
                <label className='form-label'>Prioridade</label>
                <select 
                    name='prioridade'
                    id='prioridade' 
                    value={atividade.prioridade || 'NaoDefinido'} 
                    onChange={inputTextHandler} 
                    className='form-select'
                >
                    <option value='NaoDefinido'>Selecionar...</option>
                    <option value='Baixa'>Baixa</option>
                    <option value='Normal'>Normal</option>
                    <option value='Alta'>Alta</option>
                </select>
            </div>
            <div className='col-md-12'>
                <label className='form-label'>Descrição:</label>
                <textarea 
                    name='descricao'
                    id='descricao' 
                    value={atividade.descricao || ''} 
                    className='form-control'
                    onChange={inputTextHandler}  
                />
                <hr />
            </div>
            <div className='col-12 mt-0'>
                {atividade.id === '0' ? (
                    <button 
                        className='btn btn-outline-success me-2' 
                        type='submit'
                    >
                        <FontAwesomeIcon 
                            className='me-1' 
                            icon={faFolderPlus} />
                        Criar
                    </button>
                ) : (
                    <button 
                        className='btn btn-outline-success me-2' 
                        type='submit'
                    >
                        <FontAwesomeIcon 
                            className='me-1' 
                            icon={faFloppyDisk} />
                        Salvar
                        </button>
                )}
                <button 
                    className='btn btn-outline-danger' 
                    onClick={handleCancelar}
                >  
                    <FontAwesomeIcon 
                        className='me-1' 
                        icon={faXmark} />
                    Cancelar
                </button>
            </div>
        </form>
    </>
    );
}
