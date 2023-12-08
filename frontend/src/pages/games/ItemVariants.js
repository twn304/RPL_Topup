import React, { useState } from 'react';
import '../../App.css';

const ItemVariants = ({ variants, onSelectVariant, onSelectPayment, selectedPayment }) => {
  const [selectedNominal, setSelectedNominal] = useState("");

  const handleVariantSelection = (variant) => {
    onSelectVariant(variant);
    setSelectedNominal(variant.nominal);
  };

  const handlePaymentSelection = (e) => {
    const selectedPayment = e.target.value;
    onSelectPayment(selectedPayment);
  };

  return (
    <div>
      <div className='panel-topup'>
        <h3>Pilih nominal</h3>
        {variants.map((variant) => (
          <div key={variant.id}>
            <input
              type="radio"
              id={`variant-${variant.id}`}
              name="service"
              value={variant.id}
              checked={variant.selected}
              onChange={() => handleVariantSelection(variant)}
            />
            <label htmlFor={`variant-${variant.id}`}>
              <div
                className={`panel-topup1 ${variant.selected ? 'selected' : ''}`}
                onClick={() => handleVariantSelection(variant)}
              >
                {variant.nominal} Point<br />
                Harga Rp.{variant.price}
              </div>
            </label>
          </div>
        ))}
        {selectedNominal && (
          <p>Anda memilih varian dengan nominal {selectedNominal}.</p>
        )}
      </div>
      <div className="select-payment">
        <h3>Pilih Pembayaran</h3>
        <input class="mtdbtn" type="radio" id="method0" name="method" value="Bank BCA" />
        <label class="mtdlabel" for="method0" /><img src="/assets/images/bca.png" class="img-fluid" />
        <p class="float-right" />
        <span class="badge badge-success" id="Bank_BCA">Rp.30.000</span>
        
      </div>
    </div>
  );
};

export default ItemVariants;
