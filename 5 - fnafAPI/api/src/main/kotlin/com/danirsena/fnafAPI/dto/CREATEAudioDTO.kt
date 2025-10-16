package com.danirsena.fnafAPI.dto

data class CREATEAudioDTO (
    val id: Long,
    val url: String?,
    val animatronicId: Long,
    val name: String?,
    val description: String?
)