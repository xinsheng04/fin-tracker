import express from 'express';
const router = express.Router();

import {
  getAllAssetsLiabilities,
  addAssetLiability,
  updateAssetLiabilityEntry,
  deleteAssetLiabilityEntry
} from '../controllers/assetLiabilityController.js';

router.get('/assetLiabilities/getAll', getAllAssetsLiabilities);
router.post('/assetLiabilities/add', addAssetLiability);
router.patch('/assetLiabilities/edit', updateAssetLiabilityEntry);
router.delete('/assetLiabilities/delete', deleteAssetLiabilityEntry);

export default router;