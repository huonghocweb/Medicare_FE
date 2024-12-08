import {React,useEffect, useRef, useState} from 'react';
import ProductForm from '../../../components/Admin/Product/ProductForm';
import { createProduct, getProductById, updateProduct } from '../../../services/ProductService.js';
import { useNavigate, useParams } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { getAllCategory } from '../../../services/CategoryService.js';
import CustomAlert from '../../../components/Include/CustomAlert.js';


const ProductFormPage = () => {

    const {productId} = useParams();
    const {handleSubmit,reset,register, formState : {errors}} = useForm();
    const [productById,setProductById] = useState([]);
    const [categories,setCategories] = useState([]);
    const [imageProduct,setImageProduct] = useState();
    const [files ,setFiles] = useState(null);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const fetchProductById = async () => {
        try {
                const data = await getProductById(productId);
                const productData = data.data;
                setProductById(data.data);
                setImageProduct(productData.imageUrl);
                reset  ({
                    productId : productData.productId,
                    productName : productData.productName,
                    basePrice : productData.basePrice,
                    categoryId : productData.category.categoryId,
                    description : productData.description,
                    createAt : productData.createAt
                })
        } catch (error) {
            console.error('error in fetch Product By Id',error);
        }
    }
    const fetchAllCategory = async () => {
        try {
            const data = await getAllCategory();
            console.log(data.data);
            setCategories(data.data);
        } catch (error) {
            console.error('error in fetchAllCategory',error);
        }
    }

    const submitProduct = async (data) => {
        console.log(data);
        const formData = new FormData();
        const payload = {
            ...data
        }
        if(files.length > 0){
            for(const file of files ){
              formData.append("files",file);
            }
          }
        console.log("FILE : " + files)
        formData.append('productRequest',new Blob([JSON.stringify(payload)], {type : 'application/json'}));
        try {
            let response ;
            if(productId ){
                response = await updateProduct(productId, formData);
                if(response.data != null){
                    setAlert({type : 'success' , message : 'Update product Success !'});
                }
            }else {
                response = await createProduct(formData);
                if(response.data != null){
                    setAlert({type : 'success' , message : 'Create product Success !'});
                }
            }
            setTimeout(() => {
                navigate('/admin/products');
            },3000);
        } catch (error) {
            console.error('error in submit Product',error);
        }
    }

    const handleChangeFile = (e) => {
        const selectedFiles = Array.from(e.target.files); // Chuyển thành mảng
        if (selectedFiles.length > 0) {
            const imageUrl = URL.createObjectURL(selectedFiles[0]); // Chỉ lấy file đầu tiên để hiển thị
            console.log(imageUrl);
            setFiles(selectedFiles); // Lưu danh sách file
            setImageProduct(imageUrl); // Hiển thị hình ảnh
        }
    };
    
    
    // const handleImage =  () => {
    //    let files = fileInputRef.current.files;
    //    if(files.length ===0 ){
    //     return [];
    //    }
    //    return Array.from(files);
    // }

    useEffect(() => {
        fetchAllCategory();
        if(productId ){
            fetchProductById();
        }
    },[])

    return (
        <>
        {
            alert && (
                <CustomAlert 
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )
        }
            <ProductForm
            productId = {productId}
            register = {register}
            handleSubmit = {handleSubmit}
            categories = {categories}
            submitProduct = {submitProduct}
            handleChangeFile = {handleChangeFile}
            imageProduct= {imageProduct}
             />
        </>
    );
};

export default ProductFormPage;