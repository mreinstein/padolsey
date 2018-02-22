'use strict'

const grays = [
      [ 26, 29 ],
      [ 32, 37 ],
      [ 42, 50 ],
      [ 46, 56 ],
      [ 54, 66 ]
    ]

let c, ctx


function random( max, min ) {
  min = min || 0
  return Math.random() * ( max - min ) + min
}


function cell( x, y, size ) {
  let gray = Math.floor( random( grays.length ) ),
      fill = grays[ gray ][ 0 ],
      stroke = grays[ gray ][ 1 ]

  ctx.fillStyle = 'rgb(' + fill + ', ' + fill + ', ' + fill + ')'
  ctx.strokeStyle = 'rgb(' + stroke + ', ' + stroke + ', ' + stroke + ')'
  ctx.fillRect( x, y, size, size )
  ctx.strokeRect( x + 0.5, y + 0.5, size - 1, size - 1 )
}


module.exports = function padolsey() {
  if(!c) {
    c = document.createElement( 'canvas' )
    ctx = c.getContext( '2d' )
  }

  const frequency = [ false, 30, 9 ]
  const gap = 1
  const sizes = [ 4, 9, 14 ]

  let rows, cols, cw, ch

  rows = cols = 36
  cw = ch = c.width = c.height = ( sizes[ 0 ] + gap ) * rows

  const store = []

  ctx.fillStyle = 'rgb(18, 18, 18)'
  ctx.fillRect( 0, 0, cw, ch )

  for(let x = 0; x < cols; x ++ ){
    for(let y = 0; y < rows; y ++ ){
      cell(
        ( x * sizes[ 0 ] ) + ( x * gap ),
        ( y * sizes[ 0 ] ) + ( y * gap ),
        sizes[ 0 ]
      )
    }
  }

  for(let freq = 0; freq < frequency.length; freq++ ) {
    if( frequency[ freq ] ) {
      for(let i = 0; i < frequency[ freq ]; ) {
        let canDraw, sizeNew, pad, xNew, yNew, storeLength

        canDraw = true
        sizeNew = sizes[ freq ]
        pad = Math.ceil( ( sizeNew / cw ) * rows )
        xNew = Math.floor( random( 1, cols - pad ) ) * ( ch / cols )
        yNew = Math.floor( random( 1, rows - pad ) ) * ( cw / rows )
        storeLength = store.length

        if( storeLength ) {
          for(let j = 0; j < storeLength; j++ ) {
            let storeCell = store[ j ]
            if( !(
              xNew + sizeNew + ( cw / cols ) < storeCell.x ||
              yNew + sizeNew + ( ch / rows ) < storeCell.y ||
              xNew > storeCell.x + storeCell.size + ( cw / cols ) ||
              yNew > storeCell.y + storeCell.size + ( ch / rows )
            ) ) {
              canDraw = false
              break
            }
          }
        }

        if( canDraw ) {
          cell( xNew, yNew, sizeNew )
          store.push( { x: xNew, y: yNew, size: sizeNew } )
          i++
        }
      }
    }
  }

  return c.toDataURL()
}
