import React, { useState } from 'react';
import './GetPin.css';

const GetPin = () => {
    const [isMartianSelected, setIsMartianSelected] = useState(false);
    const [isXyzCompanySelected, setIsXyzCompanySelected] = useState(false);
    const [isPinFetched,setIsPinFetched] = useState(false);
    const [formData, setFormData] = useState({
        key: '',
    });

    const formBool = isMartianSelected || isXyzCompanySelected
    function handleMartiansPin() {
        setIsMartianSelected(true);
        setIsXyzCompanySelected(false);
    }

    function handleXyzCompany() {
        setIsXyzCompanySelected(true);
        setIsMartianSelected(false);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        // Data will be fetched from this code block.

        setIsPinFetched(true);
    }
    function handleSubmit(event) {
        event.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
    }

    return (
        <>
            <section>
                <div className='getpin container'>
                    <h2 className='getpin-title'>Pin Al</h2>
                    <table className='getpin-table'>
                        <thead>
                            <tr>
                                <th>Ortak Adı</th>
                                <th>Resmi Web Sitesi</th>
                                <th>GetPin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mars Ülkesi</td>
                                <td>https://vote.martians.gov</td>
                                <td>
                                    <button className='btn-getpin' onClick={handleMartiansPin}>
                                        Pin Al
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>XYZ Oyun Şirketi</td>
                                <td>https://vote.xyz.company</td>
                                <td>
                                    <button className='btn-getpin' onClick={handleXyzCompany}>
                                        Pin al
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <div className='pin-req container'>
                    <h2 className='collab-title'>{isMartianSelected === true ? 'Martian Government' : ''}</h2>
                    <h2 className='collab-title'>{isXyzCompanySelected === true ? 'XYZ Game Company' : ''}</h2>
                    {formBool && (
                        <form onSubmit={handleSubmit}>
                            <label>
                                Key
                                <input
                                    type='text'
                                    name='key'
                                    placeholder='Key'
                                    value={formData.key}
                                    onChange={handleChange}
                                />
                            </label>
                            <button type='submit' className='btn-primary' onClick={handleFormSubmit}>
                                Pini al
                                <svg
                                    width='16'
                                    height='16'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    viewBox='0 0 24 24'
                                >
                                    <path d='M22 2 11 13'></path>
                                    <path d='m22 2-7 20-4-9-9-4 20-7z'></path>
                                </svg>
                            </button>
                        </form>
                    )}
                    {isPinFetched && (
                    <span className='pin-header'>Your Pin: {'F3412-E2-D4R52'}</span>
                )}
                </div>


            </section>
        </>
    );
};

export default GetPin;
