import { useRef, useEffect, ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

interface Props {
    title: string;
    showModal: boolean;
    close: () => void;
    children: JSX.Element | JSX.Element[];
    hasBackdrop?: boolean;
    closeOnBackdropClick?: boolean;
    className?: string;
}

function Modal({ title, showModal, close, children, hasBackdrop = true, closeOnBackdropClick = true, className = '' }: Props): ReactPortal | null {
    const modalRef = useRef<HTMLDivElement>(null);
    const modalClass = className ? `modal modal${hasBackdrop && '--backdrop'} ${className}` : `modal modal${hasBackdrop && '--backdrop'}`;

    useEffect(() => {
        if (showModal && modalRef.current) {
            modalRef.current.addEventListener('click', (event) => {
                if (event.target === modalRef.current && closeOnBackdropClick) {
                    close();
                }
            });
        }
    }, [showModal, closeOnBackdropClick, close]);

    const modal = (
        <div className={`${modalClass}`} role="dialog" aria-labelledby={title} ref={modalRef}>
            <div className="modal__wrapper">
                <div className="modal__header">
                    <h2 className="title">{title}</h2>
                </div>
                <div className="modal__content">{children}</div>
            </div>
        </div>
    );

    return showModal ? ReactDOM.createPortal(modal, document.body) : null;
}

export default Modal;
