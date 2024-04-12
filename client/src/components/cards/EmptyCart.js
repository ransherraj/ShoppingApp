
import emptycart from '../../images/emptycart.gif'

export default function EmptyCart(){

  return (
    <>
      <div className="col-md-12 vh-100">
        <div className="row d-flex justify-content-center text-capitalize">
            <img className='vh-100 gif' src={emptycart} alt="empty" />
        </div>
      </div>
    </>
  );
}
