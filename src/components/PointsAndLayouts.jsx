import { useEffect, useState } from 'react'
import Layout from './Layout/Layout'
import Point from './Point/Point'

import { useDispatch, useSelector } from 'react-redux'
import { getPointsFromApi } from '../redux/reducers/pointsSlice'
import { getMaterialsFromApi } from '../redux/reducers/materialsSlice'

function PointsAndLayouts (props) {
  const dispatch = useDispatch()

  const pointList = useSelector((state) => state.pointsSlice.pointList)
  // const isPointListLoading = useSelector((state) => state.pointsSlice.isLoading)
  // const errorInPointList = useSelector((state) => state.pointsSlice.error)

  useEffect(() => {
    dispatch(getPointsFromApi())
  }, [dispatch])

  const loadMaterials = async (pointId) => {
    dispatch(getMaterialsFromApi(pointId))
  }

  const materialAppliedMap = useSelector((state) => state.materialsSlice.materialAppliedMap)
  return pointList.map((point, i) => {
    const selectedMaterial = materialAppliedMap[point._id]
    return (
      <>
        <Layout key={point._id} src={selectedMaterial?.image} index={i} />
        <Point point={point} onClick={() => loadMaterials(point._id)} />
      </>
    )
  })
}

export default PointsAndLayouts