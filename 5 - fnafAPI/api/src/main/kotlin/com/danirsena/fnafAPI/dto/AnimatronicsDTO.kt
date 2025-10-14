package com.danirsena.fnafAPI.dto

import com.danirsena.fnafAPI.entities.Animatronic
import com.danirsena.fnafAPI.entities.Games
import com.danirsena.fnafAPI.entities.TypeAnimatronic
import org.hibernate.engine.jdbc.LobCreator

data class AnimatronicsDTO(
    val id: Long,
    val name: String,
    val description: String,
    val creator: String,
    val typeAnimatronic: Long,
    val game: Long,
    val possessed: Boolean,

    val audios: List<Long>,
    val photos: List<Long>
)
