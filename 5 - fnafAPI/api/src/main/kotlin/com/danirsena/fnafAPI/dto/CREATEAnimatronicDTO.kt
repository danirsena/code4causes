package com.danirsena.fnafAPI.dto

class CREATEAnimatronicDTO (
    val name: String,
    val description: String,
    val creator: String,
    val typeId: Long,
    val gameId: Long,
    val possessed: Boolean,
    val characterVoice: String?
)