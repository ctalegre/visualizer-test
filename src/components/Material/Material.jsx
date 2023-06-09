import PropTypes from 'prop-types'
import { useContext } from 'react'
import MaterialContext from '../../contexts/MaterialsContext'

import { getPointIdByMaterial } from '../../utils/getPointIdByMaterial'

function Material (props) {
  const { material, onClick } = props
  const { materialAppliedMap } = useContext(MaterialContext)

  function isMaterialActive () {
    const pointId = getPointIdByMaterial(material)
    const activeName = materialAppliedMap[pointId]?.name
    return activeName === material.name
  }

  const hiddenClass = !isMaterialActive() ? 'hidden' : ''
  return (
    <div
      data-test='material'
      onClick={onClick}
      className='my-3 flex rounded-md border-4 border-[#f5f2ef] bg-[#f5f2ef] shadow-md hover:cursor-pointer'
    >
      <div
        className={`${hiddenClass} flex w-36 items-center justify-center text-sm text-[#7a7676]`}
      >
        {material.name}
      </div>
      <div>
        <img
          className='h-[50px] w-[50px] sm:h-24 sm:w-24'
          src={material.materialPreview} />
      </div>
    </div>
  )
}

Material.propTypes = {
  material: PropTypes.object,
  onClick: PropTypes.func
}

export default Material
