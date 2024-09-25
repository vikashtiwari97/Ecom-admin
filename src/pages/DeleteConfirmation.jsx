import React from 'react';

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal-content">
                <h6>Are you sure you want to delete this product?</h6>
                <div className="delete-modal-actions">
                    <button className="btn btn-danger" onClick={onConfirm}>Yes, Delete</button>
                    <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                </div>
            </div>

            {/* Styling for the modal */}
            <style jsx>{`
                .delete-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .delete-modal-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 5px;
                    max-width: 400px;
                    text-align: center;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                .delete-modal-actions {
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                    gap:10px;
                }
                .btn{
                    font-size:14px;
                }
            `}</style>
        </div>
    );
};

export default DeleteConfirmation;
