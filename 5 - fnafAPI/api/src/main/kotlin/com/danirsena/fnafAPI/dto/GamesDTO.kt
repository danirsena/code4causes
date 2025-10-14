package com.danirsena.fnafAPI.dto

import java.util.Date

data class GamesDTO (
    val id: Long,
    val name: String,
    val description: String,
    val photoUrl: String,
    val dateOfRelease: Date,
    val creator: String
)