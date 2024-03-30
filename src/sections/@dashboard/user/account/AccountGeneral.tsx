// import * as Yup from 'yup';
// import { useSnackbar } from 'notistack';
// import { useCallback,useMemo } from 'react';
// // form
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// // @mui
// import { Box, Grid, Card, Stack, Typography } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// // utils
// import { fData } from '../../../../utils/formatNumber';
// // _mock
// import { countries } from '../../../../_mock';
// // components
// import {
//   FormProvider,
//   RHFSwitch,
//   RHFSelect,
//   RHFTextField,
//   RHFUploadAvatar,
// } from '../../../../components/hook-form';
// import { CreateUser } from 'src/@types/createUser';
// import { useStore } from 'src/stores/store';
// import { useNavigate } from 'react-router-dom';

// // ----------------------------------------------------------------------

// type FormValuesProps = {
//   displayName: string;
//   email: string;
//   photoURL: File | any;
//   phoneNumber: string | null;
//   country: string | null;
//   address: string | null;
//   state: string | null;
//   city: string | null;
//   zipCode: string | null;
//   about: string | null;
//   isPublic: boolean;
// };

 export default function AccountGeneral() {
//   const { enqueueSnackbar } = useSnackbar();


//   const { UserStore } = useStore();
//   const {
//     createUser,
//     updateUser,
//     editMode,
//     selectedUser,
//     clearSelectedUser,loadRoleDropdown,loadDepartmentDropdown,
//     loadLanguageDropdown,loadDocumentSecurityLevelDropdown,loadOrganizationDropdown,loadDocumentTypeDropdown,
//     Roles,Department,Language,DocumentSecurityLevel,Organization,DocumentType
//   } = UserStore;
//   const navigate = useNavigate();

//   const defaultValues = useMemo<CreateUser>(() => ({
//       id: selectedUser?.id || undefined,
//       userName: selectedUser?.userName || '',
//       email: selectedUser?.email || '',
//       password: selectedUser?.password || '',
//       phoneNumber: selectedUser?.phoneNumber || '',
//       language: selectedUser?.language || '',
//       positionTitle: selectedUser?.positionTitle || '',
//       profilePhoto: selectedUser?.profilePhoto || null,
//       isActive: selectedUser?.isActive || null,
//       userRoles: selectedUser?.userRoles || [],
//       allowedDepartments: selectedUser?.allowedDepartments || [],
//       allowedSecurityLevels: selectedUser?.allowedSecurityLevels || [],
//       allowedDocumentType: selectedUser?.allowedDocumentType || '',
//       departmentId: selectedUser?.departmentId || 0,
//       organizationId: selectedUser?.organizationId || 0,
//     }),
//     [selectedUser]
//   );

 
//   const handleDrop = useCallback(
//     (acceptedFiles) => {
//       const file = acceptedFiles[0];

//       if (file) {
//         setValue(
//           'photoURL',
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         );
//       }
//     },
//     [setValue]
//   );

//   return (
//     <FormProvider>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={4}>
//           <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
//             <RHFUploadAvatar
//               name="photoURL"
//               accept="image/*"
//               maxSize={3145728}
//               onDrop={handleDrop}
//               helperText={
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     mt: 2,
//                     mx: 'auto',
//                     display: 'block',
//                     textAlign: 'center',
//                     color: 'text.secondary',
//                   }}
//                 >
//                   Allowed *.jpeg, *.jpg, *.png, *.gif
//                   <br /> max size of {fData(3145728)}
//                 </Typography>
//               }
//             />

//             <RHFSwitch
//               name="isPublic"
//               labelPlacement="start"
//               label="Public Profile"
//               sx={{ mt: 5 }}
//             />
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={8}>
//           <Card sx={{ p: 3 }}>
//             <Box
//               sx={{
//                 display: 'grid',
//                 rowGap: 3,
//                 columnGap: 2,
//                 gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
//               }}
//             >
//               <RHFTextField name="displayName" label="Name" />
//               <RHFTextField name="email" label="Email Address" />

//               <RHFTextField name="phoneNumber" label="Phone Number" />
//               <RHFTextField name="address" label="Address" />

//               <RHFSelect name="country" label="Country" placeholder="Country">
//                 <option value="" />
//                 {countries.map((option) => (
//                   <option key={option.code} value={option.label}>
//                     {option.label}
//                   </option>
//                 ))}
//               </RHFSelect>

//               <RHFTextField name="state" label="State/Region" />

//               <RHFTextField name="city" label="City" />
//               <RHFTextField name="zipCode" label="Zip/Code" />
//             </Box>

//             <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
//               <RHFTextField name="about" multiline rows={4} label="About" />

//               <LoadingButton type="submit" variant="contained">
//                 Save Changes
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
 }
