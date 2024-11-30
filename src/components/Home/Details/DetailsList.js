import React from 'react';
import '../../../pages/Home/HomeOpent.css';
const DetailsList = ({productById ,dosageFormsByProductId,packagingsByProductId , handleGetVariationsByDosageFormId 
  ,handleGetVariationsByDosageFormIdAndPackagingId, variationChoosed , handleAddItemToCart, quantitySelect , handleChangeQuantitySelect}) => {
  if(!productById ){
      return <p>Loading ....</p>
  }
    return (
        <>
        <div className="site-section">
      <div className="container">
        <div className="row">
          <div className="col-md-5 mr-auto">
            <div className="border text-center">
              <img src={productById?.imageUrl} alt="Image" className="img-fluid p-5" />
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="text-black">{productById.productName}, 200mg</h2>
            <p>{productById.description}</p>
            <strong>Package Type : </strong>
            <div  className="button-list"> 
            {
              packagingsByProductId.map((item,index) => (
              <button key={index}
              onClick={() => handleGetVariationsByDosageFormIdAndPackagingId(item.packageId)}
              className="list-button">{item.packageType}</button>
              ))
            }
            </div>
            <strong>Dosage Form  : </strong>
            <div  className="button-list">
            {
              dosageFormsByProductId.map((item,index) => (
              <button key={index}
               className="list-button"
               onClick={() => handleGetVariationsByDosageFormId(item.dosageFormId)}
               >{item.dosageFormName}</button>
              ))
            }
            </div>
            <p><del>95.00</del>  <strong className="text-primary h4">{(variationChoosed ? variationChoosed.priceHistories[0].price : productById.basePrice).toLocaleString('vi')}đ</strong></p>
            <div className="mb-5">
              <div className="input-group mb-3" style={{maxWidth : '220px'}}>
                <div className="input-group-prepend">
                  <button className="btn js-btn-minus" onClick={() => handleChangeQuantitySelect(variationChoosed.variationId,-1)} ><i className="fa-solid fa-minus"></i></button>
                </div>
                <input type="number" onChange={(e) => handleChangeQuantitySelect(e.target.value - quantitySelect)} className="form-control text-center" value={quantitySelect}
                   />
                <div className="input-group-append">
                  <button className="btn js-btn-plus" onClick={() => handleChangeQuantitySelect(variationChoosed.variationId,1)}><i className="fa-solid fa-plus"></i></button>
                </div>
              </div>
            </div>
            <p><button disabled={!variationChoosed} onClick={() => handleAddItemToCart(variationChoosed.variationId, quantitySelect)} 
            className="btn btn-success">Add To Cart</button></p>
            <div className="mt-5">
              <ul className="nav nav-pills mb-3 custom-pill" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                    >Ordering Information</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"
                    >Specifications</a>
                </li>
            
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                  <table className="table custom-table">
                    <thead>
                      <th>Material</th>
                      <th>Description</th>
                      <th>Packaging</th>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">OTC022401</th>
                        <td>Pain Management: Acetaminophen PM Extra-Strength Caplets, 500 mg, 100/Bottle</td>
                        <td>1 BT</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                  <table className="table custom-table">
                    <tbody>
                      <tr>
                        <td>HPIS CODE</td>
                        <td className="bg-light">999_200_40_0</td>
                      </tr>
                      <tr>
                        <td>HEALTHCARE PROVIDERS ONLY</td>
                        <td className="bg-light">No</td>
                      </tr>
                      <tr>
                        <td>LATEX FREE</td>
                        <td className="bg-light">Yes, No</td>
                      </tr>
                      <tr>
                        <td>MEDICATION ROUTE</td>
                        <td className="bg-light">Topical</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    );
};

export default DetailsList;